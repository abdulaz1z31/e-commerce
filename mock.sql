CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description TEXT,
    tag VARCHAR,
    create_at TIMESTAMPTZ 
    updated_at TIMESTAMPTZ 
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category_id INT REFERENCES categories(id) ON DELETE SET NULL, 
    title VARCHAR,
    picture VARCHAR,
    summary VARCHAR,
    description VARCHAR,
    price REAL,
    discount_type VARCHAR,
    discount_value REAL,
    tags VARCHAR[], 
    create_at TIMESTAMPTZ 
    updated_at TIMESTAMPTZ 
);


SELECT id
FROM users
WHERE username = username


INSERT INTO users (name, email, password, role, avatar, username, birth_of_date, phone_number,is_active)
VALUES 
    ('User One', 'user1@example.com', 'password1', 'user', NULL, 'user1', '1990-01-01', '1234567890', TRUE),
    ('User Two', 'user2@example.com', 'password2', 'user', NULL, 'user2', '1992-02-02', '1234567891', TRUE),
    ('User Three', 'user3@example.com', 'password3', 'user', NULL, 'user3', '1994-03-03', '1234567892', TRUE),
    ('User Four', 'user4@example.com', 'password4', 'user', NULL, 'user4', '1996-04-04', '1234567893', TRUE);



INSERT INTO users (email, password,username) VALUES 
('$1', '$2', '$3');


UPDATE users
SET is_active = TRUE
WHERE username = username

UPDATE opt
SET otp = otp
WHERE username = username

SELECT id 
FROM users
WHERE username == username