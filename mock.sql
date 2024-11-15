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
