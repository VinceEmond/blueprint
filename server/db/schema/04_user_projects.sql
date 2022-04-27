-- Drop and recreate user_projects table
DROP TABLE IF EXISTS user_projects CASCADE;

CREATE TABLE user_projects (
  id SERIAL PRIMARY KEY NOT NULL,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
