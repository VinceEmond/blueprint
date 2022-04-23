-- Drop and recreate messages table
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  time_stamp TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

