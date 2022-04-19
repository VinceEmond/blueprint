-- Drop and recreate tasks table
DROP TABLE IF EXISTS tasks CASCADE;

DROP TYPE IF EXISTS current_priority;
CREATE TYPE current_priority AS ENUM ('Low', 'Medium', 'High');

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE DEFAULT NULL,
  priority current_priority DEFAULT 'Low',
  assignee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) DEFAULT NULL,
  start_date DATE DEFAULT NULL,
  due_date DATE DEFAULT NULL,
  modified_date DATE DEFAULT NULL,
  status current_status DEFAULT 'Not Started',
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

