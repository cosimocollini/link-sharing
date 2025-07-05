-- name: CreateUser :one
INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetUserByEmail :one
SELECT * FROM users WHERE email = ?;

-- name: GetUserById :one
SELECT * FROM users WHERE id = ?;

-- name: UpdateUserPersonalInfo :one
UPDATE users
SET first_name = ?, last_name = ?, public_email = ?, updated_at = ?
WHERE id = ?
RETURNING *;