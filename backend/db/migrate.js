'use strict';

require('dotenv').config();
const pool = require('../config/db');

const SQL = `
-- Enable uuid generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Announcements table
CREATE TABLE IF NOT EXISTS announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL,
  image_url  TEXT,
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Cafeteria menu table (one row per date)
CREATE TABLE IF NOT EXISTS cafeteria_menu (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date        DATE UNIQUE NOT NULL,
  soup        TEXT,
  main_course TEXT,
  side_dish   TEXT,
  dessert     TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  media_url   TEXT,
  media_type  VARCHAR(10) CHECK (media_type IN ('image', 'video')),
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ticker messages table
CREATE TABLE IF NOT EXISTS ticker_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message    TEXT NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function migrate() {
    const client = await pool.connect();
    try {
        console.log('Running database migrations…');
        await client.query(SQL);
        console.log('✅  Migrations complete.');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

migrate();
