
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           USERS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX

-- Get all user
SELECT * FROM users WHERE is_active = true;

-- Get user by ID
SELECT * FROM users WHERE id = 1 AND is_active = true;



-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           PROJECTS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX

-- Get all projects
SELECT * FROM projects WHERE is_active = true;

-- Get all projects with a certain ID
SELECT * FROM projects WHERE id = 1 AND is_active = true;

-- Update project with a certain ID
UPDATE projects SET
  name = 'Updated Project Name',
  description = 'Updated project Description',
  start_date = '1969-04-20',
  due_date = '1969-06-23',
  modified_date = '2022-04-15',
  status = 'Pending',
  category_id = '3'
  WHERE id = 1 AND is_active = true
  RETURNING *;

-- Add project with a certain owner_ID
INSERT INTO projects (owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES
  (2,'project69', 'project69 description here', '1969-04-20', '1969-04-21', '2022-04-15', 'Not Started', 3, true);

-- "Delete" a project (Set is_active = false)
UPDATE projects SET
  is_active = false
  WHERE id = 1
  RETURNING *;



-- XXXXXXXXXXXXXXXXXXXXXXXXXXX
--           TASKS
-- XXXXXXXXXXXXXXXXXXXXXXXXXXX

-- Get all tasks
SELECT * FROM tasks WHERE is_active = true;

-- Get all tasks with a certain ID
SELECT * FROM tasks WHERE id = 1 AND is_active = true;

-- Get all tasks with a certain project_id
SELECT * FROM tasks WHERE project_id = 1 AND is_active = true;


-- Update task with a certain ID
UPDATE tasks SET
  project_id = '2',
  priority = 'High',
  assignee_id = '2',
  name = 'Updated Task Name',
  description = 'Updated task Description',
  start_date = '1969-04-20',
  due_date = '1969-06-23',
  modified_date = '2022-04-15',
  status = 'Pending',
  category_id = '3'
  WHERE id = 1 AND is_active = true
  RETURNING *;

-- Add task with a certain owner_ID
INSERT INTO tasks (project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES
  (1, 'Low', 1, 'Plant Seeds', 'I need to plant seeds', '1969-04-20', '1969-04-20', '2022-04-15', 'Not Started', 1, true);

-- "Delete" a task (Set is_active = false)
UPDATE tasks SET
  is_active = false
  WHERE id = 1
  RETURNING *;
