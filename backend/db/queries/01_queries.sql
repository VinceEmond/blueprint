
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           USERS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX

-- Get all user
SELECT * FROM users;

-- Get user by ID
SELECT * FROM users WHERE id = 1;


-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           PROJECTS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
-- name, description, start_date, due_date, modified_date, status, category_id

-- Get all projects
SELECT * FROM projects;

-- Get all projects with a certain ID
SELECT * FROM projects WHERE id = 1;

-- Update projet with a certain ID
UPDATE projects SET
  name = 'Updated Project Name',
  description = 'Updated project Description',
  start_date = '1969-04-20',
  due_date = '1969-06-23',
  modified_date = '2022-04-15',
  status = 'Pending',
  category_id = '3'
  WHERE id = 1
  RETURNING *;

-- Add project with a certain owner_ID
INSERT INTO projects (owner_id, category_id, name, description, due_date, modified_date, start_date, status) VALUES
  (2, 3, 'project69', 'project69 description here', '1969-04-20', '1969-04-20', '2022-04-15', 'Not Started');


-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           TASKS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
-- user_id, category_id, project_id, name, description, due_date, modified_date, start_date, priority, status

-- Get all tasks
SELECT * FROM tasks;

-- Get all tasks with a certain ID
SELECT * FROM tasks WHERE id = 1;

-- Update task with a certain ID
UPDATE tasks SET
  project_id = '2',
  user_id = '1',
  name = 'Updated Task Name',
  description = 'Updated task Description',
  category_id = '3',
  status = 'Pending',
  start_date = '1969-04-20',
  due_date = '1969-06-23',
  modified_date = '2022-04-15',
  priority = 'High'
  WHERE id = 1
  RETURNING *;

-- Add task with a certain owner_ID
INSERT INTO tasks (user_id, category_id, project_id, name, description, due_date, modified_date, start_date, priority, status) VALUES
(2, 3, 2, 'plant seeds', 'I need to plant seeds', '1969-04-20', '1969-04-20', '2022-04-15', 'High', 'Not Started');
