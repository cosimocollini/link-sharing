-- name: CreateUser :one
INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = ?;