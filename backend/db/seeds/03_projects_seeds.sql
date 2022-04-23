-- 03_projects_seeds.sql

-- Projects table: owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active

INSERT INTO projects (owner_id, name, description, start_date, due_date, modified_date, status, category_id, is_active) VALUES
  (1, 'Uncategorized', 'All uncategorized tasks', '2022-04-01', '2022-04-06', '2022-04-11', 'Not Started', 1, false),
  (2, 'Project 2 Name', 'Project2 description: frankfurter. Pork loin capicola leberkas chicken pork belly ham rump strip steak jerky. Chuck kevin tongue ham hock, tri-tip shoulder leberkas turkey biltong rump chicken cow', '2022-04-02','2022-04-07', '2022-04-12', 'In Progress', 2, true),
  (3, 'Project 3 Name', 'Project3 description: picanha. Meatball kielbasa turducken beef doner tenderloin shoulder salami corned beef kevin ribeye. Bresaola flank cow porchetta biltong jowl.tongue ham hock, tri-tip shoulder', '2022-04-03','2022-04-08', '2022-04-13', 'Pending', 3, true),
  (1, 'Project 4 Name', 'Project4 description: Buffalo meatball fatback venison landjaeger alcatra, chicken picanha shoulder kielbasa capicola short ribs. Pork belly cupim brisket doner t-bone, picanha bresaola turducken pork', '2022-04-03','2022-04-08', '2022-04-13', 'Complete', 1, true),
  (2, 'Project 5 Name', 'Project5 description: chop drumstick prosciutto. Strip steak shank tongue pork belly, chislic ball tip ham hock pig meatball. Brisket sausage pastrami cupim. Swine sirloin prosciutto strip steak chicken.', '2022-04-03','2022-04-08', '2022-04-13', 'Complete', 2, true),
  (3, 'Project 6 Name', 'Project6 description: Sausage bresaola turkey buffalo short ribs tail. Jerky buffalo beef ribs kielbasa, andouille chislic turducken ham leberkas porchetta. Kevin shank bacon, andouille tenderloin sirloin', '2022-04-03','2022-04-08', '2022-04-13', 'Complete', 3, true),
  (3, 'Project 7 Name', 'Project6 description: Sausage bresaola turkey buffalo short ribs tail. Jerky buffalo beef ribs kielbasa, andouille chislic turducken ham leberkas porchetta. Kevin shank bacon, andouille tenderloin sirloin', '2022-04-03','2022-04-08', '2022-04-13', 'Not Started', 3, true)
;
