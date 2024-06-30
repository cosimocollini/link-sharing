package main

import (
	"database/sql"
	"time"

	"github.com/cosimocollini/link-sharing-app/internal/database"
)

type APIResponse[T any] struct {
	Success bool `json:"success"`
	Content T    `json:"content"`
	Status  int  `json:"status"`
}

type User struct {
	ID        string    `json:"id"`
	FirstName *string   `json:"first_name,omitempty"`
	LastName  *string   `json:"last_name,omitempty"`
	Password  string    `json:"password,omitempty"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
}

//	func databaseUserToUser(user database.User) User {
//		return User{
//			ID:        user.ID,
//			FirstName: nullStringToString(user.FirstName),
//			LastName:  nullStringToString(user.LastName),
//			Email:     user.Email,
//		}
//	}
func databaseUserToUser(success bool, status int, user database.User) APIResponse[User] {
	return APIResponse[User]{
		Success: success,
		Content: User{
			ID:        user.ID,
			FirstName: nullStringToString(user.FirstName),
			LastName:  nullStringToString(user.LastName),
			Email:     user.Email,
		},
		Status: status,
	}
}

func nullStringToString(s sql.NullString) *string {
	if s.Valid {
		return &s.String
	}
	return nil
}
