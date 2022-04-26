-- 03_projects_seeds.sql

-- Projects table: owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active

INSERT INTO projects (owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES
  (1, 'Uncategorized', 'All uncategorized tasks', '2022-04-14', '2022-04-29', '2022-04-18', 'Not Started', 1, false),
  (3, 'Landing Page', 'Create a nice, simple website landing page', '2022-04-14','2022-04-29', '2022-04-28', 'In Progress', 2, true),
  (2, 'Dashboard', 'Create personalized components required in the dashboard', '2022-04-15','2022-04-29', '2022-04-26', 'Pending', 3, true),
  (1, 'Projects', 'Create all projects view page that is able to render different views', '2022-04-18','2022-04-29', '2022-04-20', 'Complete', 1, true),
  (1, 'Tasks', 'Create all tasks view page that is able to render different views', '2022-04-03','2022-04-18', '2022-04-17', 'Complete', 2, true),
  (2, 'List View', 'Create table list view of all tasks and projects', '2022-04-03','2022-04-29', '2022-04-22', 'Complete', 3, true),
  (3, 'Trello Board', 'Create trello board view of all tasks and projects', '2022-04-03','2022-04-29', '2022-04-24', 'Not Started', 3, true),
  (2, 'Forms', 'Create forms for new and updated tasks and projects.', '2022-04-03','2022-04-29', '2022-04-28', 'Not Started', 3, true),
  (1, 'Speech Recognition', 'Research and implement speech recognition for site navigation and smooth user experience', '2022-04-22','2022-04-29', '2022-04-16', 'Not Started', 3, true),
  (3, 'Message Board', 'Create a discussion message board', '2022-04-19','2022-04-29', '2022-04-17', 'Not Started', 3, true),
  (3, 'Carousel', 'Create carousel view for dashboard that shows projects for particular user', '2022-04-17','2022-04-29', '2022-04-19', 'Not Started', 3, true),
  (1, 'Navigation', 'Create navigation bar with working routing', '2022-04-03','2022-04-29', '2022-04-19', 'Not Started', 3, true),
  (2, 'Login/Register', 'Create login and register page', '2022-04-03','2022-04-29', '2022-04-21', 'Not Started', 3, true),
  (2, 'Twilio', 'Research and implement twilio API for text message notifications', '2022-04-22','2022-04-29', '2022-04-18', 'Not Started', 3, true),
  (3, 'Web styling', 'Choose color scheme and interactive side-effects', '2022-04-24','2022-04-29', '2022-04-25', 'In Progress', 3, true)
;
