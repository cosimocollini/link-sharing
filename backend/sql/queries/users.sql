-- name: CreateUser :one
INSERT INTO users (id, email, password, first_name, last_name, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?)
RETURNING *;

-- name: GetUserByEmail :one
SELECT 
    u.id,
    u.password,
    u.public_email,
    u.first_name,
    u.last_name,
    u.avatar_base64,
    json_group_array(
    json_object(
      'id', sl.id,
      'platform', sl.platform,
      'url', sl.url,
      'display_order', sl.display_order
    )
  ) AS social_links_json
FROM users u
LEFT JOIN social_links sl ON u.id = sl.user_id
WHERE email = ?
GROUP BY u.id;

-- name: GetUserById :one
SELECT 
    u.id,
    u.public_email,
    u.first_name,
    u.last_name,
    u.avatar_base64,
    json_group_array(
    json_object(
      'id', sl.id,
      'platform', sl.platform,
      'url', sl.url,
      'display_order', sl.display_order
    )
  ) AS social_links_json
FROM users u
LEFT JOIN social_links sl ON u.id = sl.user_id
WHERE u.id = ?
GROUP BY u.id;

-- name: UpdateUserPersonalInfo :one
UPDATE users
SET first_name = ?, last_name = ?, public_email = ?, avatar_base64 = ?, updated_at = CURRENT_TIMESTAMP
WHERE id = ?
RETURNING *;

-- name: UpdateSocialLinks :many
INSERT INTO social_links (user_id, platform, url, display_order, updated_at)
VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
ON CONFLICT(user_id, platform) DO UPDATE SET
    url = EXCLUDED.url,
    display_order = EXCLUDED.display_order,
    updated_at = CURRENT_TIMESTAMP
RETURNING *;

-- name: DeleteSocialLink :exec
DELETE FROM social_links
WHERE id IN (SELECT value FROM json_each(?))
AND user_id = (?);

-- name: ListSocialLinksByUserId :many
SELECT * FROM social_links
WHERE user_id = ?
ORDER BY display_order;