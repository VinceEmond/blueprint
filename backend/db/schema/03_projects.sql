-- Drop and recreate projects table
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

DROP TYPE IF EXISTS current_status;

CREATE TYPE current_status AS ENUM ('Not Started', 'In Progress', 'Pending', 'Complete');

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  modified_date DATE NOT NULL,
  start_date DATE NOT NULL,
  status current_status
);

