-- 05_tasks_seeds.sql

-- Tasks table: project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id, is_active

INSERT INTO tasks (project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES

  -- PROJECT 1 UNCATEGORIZED
  (1, 'Low', 1, 'Lighthouse Homework', 'Visit Compass and check for assignments.', '2022-04-14', '2022-04-29', '2022-04-24', 'In Progress', 1, true),
  (1, 'High', 2, 'Resume review', 'Update resume for review with CS.', '2022-01-02','2022-04-14', '2022-04-25', 'In Progress', 1, true),
  (1, 'Medium', 1, 'Apply for jobs', 'Keep track of application information.', '2022-01-03','2025-01-12', '2022-04-19', 'Complete', 1, true),

  -- PROJECT 2 PROJECT PLANNING
  (2, 'Low', 1, 'User Stories', 'Do a complete set of user stories to plan for project.', '2022-04-14','2025-04-16', '2022-04-16', 'In Progress', 2, true),
  (2, 'Medium', 2, 'ERD', 'Do ERD and get reviewed by mentor.', '2022-04-14','2025-04-18', '2022-04-18', 'In Progress', 3, true),
  (2, 'High', 3, 'Wireframes', 'Draw some wireframes for website design.', '2022-04-14','2022-04-19', '2022-04-19', 'Pending', 4, true),

  -- PROJECT 3 BACKEND API
  (3, 'Low', 1, 'RESTful routes', 'Using user stories, determine resources.', '2022-04-14','2022-04-20', '2022-04-20', 'Not Started', 5, true),
  (3, 'High', 2, 'Server setup', 'Create backend folder and import necessary packages.', '2022-04-14','2025-04-20', '2022-04-20', 'Complete', 6, true),
  (3, 'High', 2, 'Setup database reset', 'Use previous project to setup quick database reset.', '2022-04-14','2025-04-21', '2022-04-21', 'Complete', 7, true),

  -- PROJECT 4 DATABASE
  (4, 'High', 2, 'Setup schema', 'Write all schemas required for application.', '2022-04-14','2022-04-20', '2022-04-20', 'Complete', 4, true),
  (4, 'Medium', 3, 'Setup seeds', 'Write all seeds required for application.', '2022-04-14','2022-04-20', '2022-04-20', 'Complete', 3, true),
  (4, 'Low', 1, 'Setup queries', 'Write all PostgreSQL queries required for application.', '2022-04-14','2025-04-21', '2022-04-21', 'In Progress', 7, true),

  -- PROJECT 5 DASHBOARD COMPONENTS
  (5, 'Low', 1, 'Design greeting panel', 'Show user current date and greet them with their name.', '2022-04-14','2022-04-23', '2022-04-23', 'Not Started', 5, true),
  (5, 'High', 2, 'Design user task panel', 'Need to create user specific panel for tasks.', '2022-04-14','2022-04-24', '2022-04-24', 'Complete', 1, true),
  (5, 'High', 2, 'Quick add task feature', 'Implement quick add task feature for improved user experience.', '2022-04-14','2022-04-25', '2022-04-25', 'Complete', 2, true),
  (5, 'High', 1, 'Design user projects panel', 'Need to create user specific panel for projects.', '2022-04-14','2022-04-21', '2022-04-21', 'Complete', 2, true),
  (5, 'Medium', 2, 'Research example carousels', 'Find good examples of carousel designs, discuss with team and choose best.', '2022-04-14','2022-04-22', '2022-04-22', 'Not Started', 1, true),
  (5, 'Medium', 3, 'Create button for adding project', 'Will need a button to trigger new project form modal.', '2022-04-14','2022-04-19', '2022-04-19', 'Pending', 4, true),

  -- PROJECT 6 lIST/BOARD VIEW FOR PROJECTS
  (6, 'High', 2, 'Table view', 'Research libraries, implement table view for projects/tasks.', '2022-04-14','2025-04-29', '2022-06-06', 'Not Started', 6, true),
  (6, 'Medium', 3, 'Trello board view', 'Research libraries, implement table view for projects/tasks.', '2022-04-14','2022-04-29', '2022-06-06', 'Pending', 6, true),

  -- PROJECT 7 LIST/BOARD VIEW FOR TASKS
  (7, 'High', 2, 'Table view', 'Implement trello board view for projects/tasks.', '2022-04-14','2022-04-25', '2022-04-27', 'Not Started', 7, true),
  (7, 'Medium', 3, 'Trello board view', 'implement trello board view for projects/tasks.', '2022-04-14','2022-04-26', '2022-04-26', 'Pending', 7, true),

  -- PROJECT 8 FORMS
  (8, 'High', 2, 'New Task/Project Form', 'Create form for adding new task/project.', '2022-04-14','2022-04-17', '2022-04-18', 'In Progress', 5, true),
  (8, 'Medium', 3, 'Update Task/Project Form', 'Create form for adding updating task/project.', '2022-04-14','2022-04-18', '2022-04-20', 'In Progress', 6, true),
  (8, 'Medium', 1, 'Modal to render forms', 'Research Chakra UI modals for use', '2022-04-14','2022-04-19', '2022-04-20', 'Pending', 4, true),
  (8, 'High', 2, 'Connect modal/form to projects', 'Connect form and modal to the the all projects page.', '2022-04-14','2022-04-22', '2022-04-22', 'Not Started', 3, true),
  (8, 'Medium', 3, 'Connect modal/form to tasks', 'Connect form and modal to the the all tasks page.', '2022-04-14','2022-04-23', '2022-04-23', 'Pending', 4, true),

  -- PROJECT 9 SPEECH RECOGNITION
  (9, 'High', 2, 'Research react speech recognition', 'Look into the potential of adding speech recognition to improve user experience.', '2022-04-14','2022-04-29', '2022-04-28', 'Not Started', 6, true),
  (9, 'Medium', 3, 'Speech recognition proof of concept', 'Create proof of concept using react speech recognitions sample code.', '2022-04-14','2022-04-29', '2022-04-27', 'In Progress', 7, true),

  -- -- PROJECT 10 TWILIO
  (10, 'Low', 2, 'Register for Twilio account', 'Register for Twilio account and investigate feasibility of integrating it into blueprint.', '2022-04-14','2022-04-22', '2022-04-23', 'Not Started', 3, true),
  (10, 'Medium', 3, 'Implement basic Twilio test', 'Setup a test feature as proof of concept before fully diving in.', '2022-04-14','2022-04-23', '2022-04-22', 'Complete', 4, true),
  (10, 'Medium', 1, 'Implement notification', 'Setup notification for message board posts.', '2022-04-14','2022-04-25', '2022-04-22', 'Pending', 3, true),

  -- PROJECT 11 MESSAGE BOARD
  (11, 'High', 2, 'Do proof of concept', 'Setup a simple message board.', '2022-04-14','2022-04-24', '2022-04-22', 'Not Started', 4, true),
  (11, 'Medium', 3, 'Implement notification', 'Use Twilio notification for new messages.', '2022-04-14','2022-04-26', '2022-04-22', 'Pending', 7, true),

  -- PROJECT 12 NAVIGATION AND ROUTING
  (12, 'Medium', 3, 'Design navbar with all routes', 'Add links to main pages (Dashboard, Tasks, Projects).', '2022-04-14','2022-04-27', '2022-04-26', 'Pending', 1, true),
  (12, 'High', 2, 'Implement main routes', 'React-router-dom will allow us to manage routes from the frontend.', '2022-04-14','2022-04-28', '2022-04-27', 'In Progress', 3, true),

  -- -- PROJECT 13 APPLICATION STYLING
  (13, 'High', 2, 'Font and themes', 'Go through fonts and choose different fonts and themes for whole application.', '2022-04-14','2022-04-29', '2022-04-28', 'Not Started', 5, true),
  (13, 'Medium', 1, 'Color Scheme', 'Go through color palettes and decide on color scheme for whole application.', '2022-04-14','2022-04-28', '2022-04-27', 'Pending', 4, true),
  (13, 'Medium', 3, 'Design carousel', 'Decide what information is most important for each project, choose best layout for each card.', '2022-04-14','2022-04-25', '2022-04-27', 'Complete', 3, true),
  (13, 'Medium', 3, 'Design carousel card layout', 'Decide what information is most important for each project, choose best layout for each card.', '2022-04-14','2022-04-26', '2022-04-26', 'Complete', 2, true)
;
