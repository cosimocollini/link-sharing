package main

import (
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

	resp := UserResponse{
		ID:        user.ID,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
	}

	c.JSON(http.StatusOK, APIResponse[UserResponse]{true, resp, http.StatusOK})
}
