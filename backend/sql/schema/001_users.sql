-- +goose Up
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    public_email TEXT UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_base64 TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_links (
    id            INTEGER     PRIMARY KEY AUTOINCREMENT,
    user_id       TEXT        NOT NULL,
    platform      TEXT        NOT NULL,
    url           TEXT        NOT NULL,
    display_order INTEGER     DEFAULT 0,
    created_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE public_profiles (
    user_id    TEXT      PRIMARY KEY,
    slug       TEXT      NOT NULL UNIQUE,
    is_active  BOOLEAN   NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- +goose Down
DROP TABLE public_profiles;
DROP TABLE social_links;
DROP TABLE users;