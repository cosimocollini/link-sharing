package main

import (
	"database/sql"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/cosimocollini/link-sharing-app/auth"
	"github.com/cosimocollini/link-sharing-app/internal/database"
	"github.com/cosimocollini/link-sharing-app/validators"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type UserResponse struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}
type UserDetails struct {
	ID           string `json:"id"`
	PublicEmail  string `json:"publicEmail"`
	FirstName    string `json:"firstName"`
	LastName     string `json:"lastName"`
	AvatarBase64 string `json:"avatarBase64,omitempty"`
}

func (cfg *apiConfig) handlerUsersCreate(c *gin.Context) {
	type parameters struct {
		Password string `json:"password" validate:"required,min=5"`
		Email    string `json:"email" validate:"required,email"`
	}
	params := parameters{}
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	errors, err := validators.BaseValidator(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, errors)
		return
	}

	email := strings.TrimSpace(strings.ToLower(params.Email))

	if _, err := cfg.DB.GetUserByEmail(c.Request.Context(), email); err == nil {
		c.JSON(http.StatusConflict, APIResponse[string]{Success: false, Content: "User already exist", Status: http.StatusConflict})
		return
	}

	hashedPassword, err := auth.HashPassword(params.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Couldn't hash password")
		return
	}

	userID := uuid.NewString()
	now := time.Now().UTC()
	createdUser, err := cfg.DB.CreateUser(c.Request.Context(), database.CreateUserParams{
		ID:        userID,
		Email:     email,
		Password:  hashedPassword,
		CreatedAt: now,
		UpdatedAt: now,
	})

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, "Couldn't create user")
		return
	}

	newJwt, err := auth.MakeJWT(createdUser.ID, cfg.jwtSecret, time.Hour*24)
	if err != nil {
		log.Printf("Error generating JWT: %v", err)
		c.JSON(http.StatusInternalServerError, APIResponse[string]{false, "Internal server error", http.StatusInternalServerError})
		return
	}

	auth.SetCookie(c, "link_sharing_token", newJwt, 1)

	resp := UserResponse{
		ID:        createdUser.ID,
		Email:     createdUser.Email,
		CreatedAt: createdUser.CreatedAt,
	}

	c.JSON(http.StatusCreated, APIResponse[UserResponse]{true, resp, http.StatusCreated})
}

func (cfg *apiConfig) handlerUsersMe(c *gin.Context) {
	tokenString, err := c.Cookie("link_sharing_token")
	if err != nil {
		log.Printf("Error getting cookie: %v", err)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Unauthorized", http.StatusUnauthorized})
		return
	}

	userID, err := auth.ValidateJWT(tokenString, cfg.jwtSecret)
	if err != nil {
		log.Printf("Error getting user ID from cookie: %v", err)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Unauthorized", http.StatusUnauthorized})
		return
	}

	user, err := cfg.DB.GetUserById(c.Request.Context(), userID)
	if err != nil {
		log.Printf("Error getting user by ID: %v", err)
		c.JSON(http.StatusInternalServerError, APIResponse[string]{false, "Internal server error", http.StatusInternalServerError})
		return
	}

	resp := UserDetails{
		ID:           user.ID,
		PublicEmail:  user.PublicEmail.String,
		FirstName:    user.FirstName.String,
		LastName:     user.LastName.String,
		AvatarBase64: user.AvatarBase64.String,
	}

	c.JSON(http.StatusOK, APIResponse[UserDetails]{true, resp, http.StatusOK})
}

func (cfg *apiConfig) handlerUsersLogout(c *gin.Context) {
	auth.SetCookie(c, "link_sharing_token", "", -1)

	c.JSON(http.StatusNoContent, APIResponse[string]{true, "Logged out successfully", http.StatusNoContent})
}

func (cfg *apiConfig) handleUsersLogin(c *gin.Context) {
	type parameters struct {
		Email    string `json:"email" validate:"required,email"`
		Password string `json:"password" validate:"required,min=5"`
	}
	params := parameters{}
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	errors, err := validators.BaseValidator(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, errors)
		return
	}

	email := strings.TrimSpace(strings.ToLower(params.Email))

	user, err := cfg.DB.GetUserByEmail(c.Request.Context(), email)
	if err != nil {
		time.Sleep(100 * time.Millisecond)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Invalid credentials", http.StatusUnauthorized})
		return
	}

	if err := auth.CheckPasswordHash(params.Password, user.Password); err != nil {
		time.Sleep(100 * time.Millisecond)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Invalid credentials", http.StatusUnauthorized})
		return
	}

	newJwt, err := auth.MakeJWT(user.ID, cfg.jwtSecret, time.Hour*24)
	if err != nil {
		log.Printf("Error generating JWT: %v", err)
		c.JSON(http.StatusInternalServerError, APIResponse[string]{false, "Internal server error", http.StatusInternalServerError})
		return
	}

	auth.SetCookie(c, "link_sharing_token", newJwt, 1)

	resp := UserDetails{
		ID:          user.ID,
		PublicEmail: user.PublicEmail.String,
		FirstName:   user.FirstName.String,
		LastName:    user.LastName.String,
	}

	c.JSON(http.StatusOK, APIResponse[UserDetails]{true, resp, http.StatusOK})
}

func (cfg *apiConfig) handleUsersUpdateDetails(c *gin.Context) {
	type parameters struct {
		PublicEmail string `json:"email" validate:"omitempty,email"`
		FirstName   string `json:"firstName" validate:"required,min=5"`
		LastName    string `json:"lastName" validate:"required,min=5"`
		AvatarB64   string `json:"profileImage" validate:"omitempty,datauri"`
	}
	params := parameters{}
	if err := c.ShouldBindJSON(&params); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	errors, err := validators.BaseValidator(params)
	if err != nil {
		c.JSON(http.StatusBadRequest, errors)
		return
	}

	email := strings.TrimSpace(strings.ToLower(params.PublicEmail))
	firstName := strings.TrimSpace(params.FirstName)
	lastName := strings.TrimSpace(params.LastName)

	tokenString, err := c.Cookie("link_sharing_token")
	if err != nil {
		log.Printf("Error getting cookie: %v", err)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Unauthorized", http.StatusUnauthorized})
		return
	}

	userID, err := auth.ValidateJWT(tokenString, cfg.jwtSecret)
	if err != nil {
		log.Printf("Error getting user ID from cookie: %v", err)
		c.JSON(http.StatusUnauthorized, APIResponse[string]{false, "Unauthorized", http.StatusUnauthorized})
		return
	}

	updatedUser, err := cfg.DB.UpdateUserPersonalInfo(c.Request.Context(), database.UpdateUserPersonalInfoParams{
		ID:           userID,
		PublicEmail:  sql.NullString{String: email, Valid: email != ""},
		FirstName:    sql.NullString{String: firstName, Valid: firstName != ""},
		LastName:     sql.NullString{String: lastName, Valid: lastName != ""},
		AvatarBase64: sql.NullString{String: params.AvatarB64, Valid: params.AvatarB64 != ""},
	})

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, "Couldn't update user")
		return
	}

	resp := UserDetails{
		ID:           updatedUser.ID,
		PublicEmail:  updatedUser.PublicEmail.String,
		FirstName:    updatedUser.FirstName.String,
		LastName:     updatedUser.LastName.String,
		AvatarBase64: updatedUser.AvatarBase64.String,
	}

	c.JSON(http.StatusOK, APIResponse[UserDetails]{true, resp, http.StatusOK})
}
