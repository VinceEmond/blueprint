-- 03_projects_seeds.sql

INSERT INTO projects (owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES
  (1, 'Uncategorized', 'All uncategorized tasks', '2022-04-14', '2022-04-29', '2022-04-18', 'Pending', 1, false),
  (3, 'Project planning', 'Plan the things required for the project', '2022-04-14','2022-04-29', '2022-04-28', 'In Progress', 2, true),
  (2, 'Backend API', 'Create API and routes required', '2022-04-15','2022-04-29', '2022-04-26', 'Pending', 3, true),
  (1, 'Database', 'Setup PostgreSQL database', '2022-04-18','2022-04-29', '2022-04-20', 'Complete', 1, true),
  (1, 'Dashboard components', 'Create dynamic message, carousel, and quick add task components', '2022-04-03','2022-04-18', '2022-04-17', 'Complete', 2, true),
  (2, 'All projects components', 'Create table list view and trello board views', '2022-04-03','2022-04-29', '2022-04-22', 'Complete', 3, true),
  (3, 'All tasks components', 'Create table list view and trello board views', '2022-04-03','2022-04-29', '2022-04-24', 'In Progress', 3, true),
  (2, 'Forms', 'Create register/login and new/update task-project forms', '2022-04-03','2022-04-29', '2022-04-28', 'Pending', 3, true),
  (1, 'Speech Recognition', 'Research and implement speech recognition', '2022-04-22','2022-04-29', '2022-04-16', 'Not Started', 3, true),
  (3, 'Twilio implementation', 'Research and implement twilio API for text message notifications', '2022-04-22','2022-04-29', '2022-04-18', 'Not Started', 3, true),
  (3, 'Message Board', 'Create a discussion message board', '2022-04-19','2022-04-29', '2022-04-17', 'Not Started', 3, true),
  (1, 'Navigation and routing', 'Create navigation bar with working routing', '2022-04-03','2022-04-29', '2022-04-19', 'Not Started', 3, true),
  (2, 'Application styling', 'Choose color scheme and interactive side-effects', '2022-04-24','2022-04-29', '2022-04-25', 'In Progress', 3, true)
;
