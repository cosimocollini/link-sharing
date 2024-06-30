package main

import (
	"log"
	"net/http"
	"time"

	"github.com/cosimocollini/link-sharing-app/auth"
	"github.com/cosimocollini/link-sharing-app/internal/database"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func (cfg *apiConfig) handlerUsersCreate(c *gin.Context) {
	var user User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if _, err := cfg.DB.GetUserByEmail(c, user.Email); err == nil {
		c.JSON(http.StatusConflict, APIResponse[string]{Success: false, Content: "User already exist", Status: http.StatusConflict})
		return
	}

	hashedPassword, err := auth.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Couldn't hash password")
		return
	}

	createdUser, err := cfg.DB.CreateUser(c.Request.Context(), database.CreateUserParams{
		ID:        uuid.New().String(),
		Email:     user.Email,
		Password:  hashedPassword,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	})

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, "Couldn't create user")
		return
	}

	newJwt, err := auth.MakeJWT(createdUser.ID, cfg.jwtSecret, time.Hour*24)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Couldn't create access JWT")
		return
	}

	auth.SetCookie(c, "link-sharing", newJwt, 1)

	c.JSON(http.StatusOK, databaseUserToUser(true, http.StatusOK, createdUser))
}
