-- Drop and recreate tasks table
DROP TABLE IF EXISTS tasks CASCADE;

DROP TYPE IF EXISTS current_priority;
CREATE TYPE current_priority AS ENUM ('Low', 'Medium', 'High');

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  due_date DATE NOT NULL,
  modified_date DATE NOT NULL,
  start_date DATE NOT NULL,
  status current_status,
  priority current_priority,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

