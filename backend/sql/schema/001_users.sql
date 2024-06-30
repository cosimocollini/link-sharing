-- +goose Up
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- +goose Down
DROP TABLE users;