import { logger } from "../../utils/index.utils.js";
import { pool } from "../../database/db.js";

export const createUserTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        role VARCHAR DEFAULT 'user',  
        avatar VARCHAR,
        username VARCHAR UNIQUE NOT NULL,
        birth_of_date DATE,
        phone_number VARCHAR UNIQUE NOT NULL,
        is_active BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.log("Error creating User table:", error);
  }
};


export const createSocialProfilesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS social_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        platform VARCHAR NOT NULL,
        platform_user VARCHAR NOT NULL
      )
    `);
  } catch (error) {
    console.log("Error creating Social Profiles table:", error);
  }
};

export const createAddressesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        address_line_1 VARCHAR,
        address_line_2 VARCHAR,
        country VARCHAR,
        city VARCHAR,
        postal_code VARCHAR,
        phone_number VARCHAR,
        landmark VARCHAR
      )
    `);
  } catch (error) {
    console.log("Error creating Addresses table:", error);
  }
};

export const createCategoriesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        description TEXT,
        tag VARCHAR,
        create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.log("Error creating Categories table:", error);
  }
};

export const createProductsTable = async () => {
  try {
    await pool.query(`
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
        create_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.log("Error creating Products table:", error);
  }
};

export const createOtpTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS otp (
        id SERIAL PRIMARY KEY,
        username INT REFERENCES users(username) ON DELETE CASCADE,
        otp VARCHAR
      )
    `);
  } catch (error) {
    console.log("Error creating Products table:", error);
  }
};