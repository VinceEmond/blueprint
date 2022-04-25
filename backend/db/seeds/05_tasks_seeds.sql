-- 05_tasks_seeds.sql

-- Tasks table: project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id, is_active

INSERT INTO tasks (project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES

  -- PROJECT 1 UNCATEGORIZED
  (1, 'Low', 1, 'Task A Name', 'Task A Description: Bacon ipsum dolor amet flank', '2022-01-01', '2022-01-05', '2022-06-06', 'Not Started', 1, true),
  (1, 'Medium', 2, 'Task B Name', 'Task B Description: trami brisket shank bacon hamburger', '2022-01-02','2025-01-10', '2022-06-06', 'In Progress', 2, true),
  (1, 'High', 3, 'Task C Name', 'Task C Description: brisket, pork belly pork chop shank', '2022-01-03','2025-01-12', '2022-06-06', 'Complete', 3, true),

  -- PROJECT 2 LANDING PAGE
  (2, 'Low', 1, 'Task D Name', 'Task D Description: brisket, pork belly pork chop shank', '2022-01-14','2025-01-19', '2022-06-06', 'Pending', 4, true),
  (2, 'Medium', 2, 'Task E Name', 'Task E Description: ket shank bacon hamburg', '2022-02-05','2025-03-12', '2022-06-06', 'Not Started', 1, true),
  (2, 'High', 3, 'Task F Name', 'Task F Description: trami brisket shank bacon hamburger', '2022-03-15','2025-03-20', '2022-06-06', 'Pending', 2, true),

  -- PROJECT 3 DASHBOARD
  (3, 'Low', 1, 'Design greeting panel', 'Show user current date and greet them with their name.', '2022-07-16','2025-07-22', '2022-06-06', 'Not Started', 3, true),
  (3, 'High', 2, 'Design user task panel', 'Need to create user specific panel for tasks.', '2022-08-26','2025-08-28', '2022-06-06', 'Complete', 4, true),
  (3, 'High', 2, 'Quick add task feature', 'Implement quick add task feature for improved user experience.', '2022-08-26','2025-08-28', '2022-06-06', 'Complete', 4, true),
  (3, 'High', 2, 'Design user projects panel', 'Need to create user specific panel for projects.', '2022-08-26','2025-08-28', '2022-06-06', 'Complete', 4, true),

  -- PROJECT 4 PROJECTS PAGE
  (4, 'Medium', 3, 'Task I Name', 'Task I Description: Chuck spare ribs meatloaf chislic pork', '2022-09-01','2025-09-10', '2022-06-06', 'Complete', 1, true),
  (4, 'Low', 1, 'Task J Name', 'Task J Description: oner t-bone, picanha bresaola turducken', '2022-09-11','2025-09-12', '2022-06-06', 'In Progress', 2, true),

  -- PROJECT 5 TASKS PAGE
  (5, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (5, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 6 lIST VIEW FOR PROJECTS/TASKS
  (6, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (6, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 7 TRELLO BOARD VIEW FOR PROJECTS/TASKS
  (7, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (7, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 8 FORMS
  (8, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (8, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 9 SPEECH RECOGNITION
  (9, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (9, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 10 MESSAGE BOARD
  (10, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (10, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 11 MESSAGE BOARD
  (11, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (11, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 12 CAROUSEL
  (12, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (12, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 13 NAVIGATION
  (13, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (13, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 14 LOGIN/REGISER
  (14, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (14, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 15 LOGIN/REGISER
  (15, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-15','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (15, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 16 TWILIO
  (16, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-16','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (16, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

  -- PROJECT 17 Web styling and interactivity
  (17, 'High', 2, 'Task K Name', 'Task K Description: . Kevin shank bacon, andouille tenderloin', '2022-09-17','2025-09-19', '2022-06-06', 'Not Started', 3, true),
  (17, 'Medium', 3, 'Task L Name', 'Task L Description: atback. Strip steak beef ribs pancetta short', '2022-10-25','2025-10-27', '2022-06-06', 'Pending', 4, true)

;
