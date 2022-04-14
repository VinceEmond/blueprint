# User Stories

## Template

As a **\_\_\_\_\_\_**, I want to **\_\_\_\_\_\_**, because **\_\_\_\_\_\_**.

---

### High Priority Stories

1. As a user, I want to be able to make a project because I would like to track tasks for that project
2. As a user, I want to add tasks to a given project because it breaks down the project into smaller pieces
3. As a user, for any given task I want to be able to add details about the task (assign someone to it, set status (started / in progress / completed) , priority level, start date and due date, and tags for filtering) because detailed information is required to accurately manage tasks
4. As a user, I want to be able to edit, update, and delete any tasks or projects because needs may change

### Stretch

1. As a user, I want to only see tasks for projects I am involved in because I am only interested in work relating to me

### Super-Stretch (Diagrams / Graphs / Metrics)

1. As a project owner, I want a separate project owner dashboard because I need to keep track of all tasks and completion statuses to allocate resources accordingly
2. As a user, I want a chat capability to converse with teammates because it means I don't have to use another communication app
3. As a user, I want to sort and filter tasks/projects because it allows me to prioritize work more quickly

---

# Resources (ie: nouns)

- Users
- Projects
- Tasks

---

# Routes

Index
/

Users

- B GET /users/
- R GET /users/:id
- ~~E POST /users/:id~~
- ~~A POST /users/~~
- ~~D POST /users/:id/delete~~

Projects

- B GET /api/projects/
- R GET /api/projects/:id
- E POST /api/projects/:id
- A POST /api/projects/
- ~~D POST /api/projects/:id/delete~~

Tasks

- B GET /api/tasks/
- R GET /api/tasks/:id
- E POST /api/tasks/:id
- A POST /api/tasks/
- ~~D POST /api/tasks/:id/delete~~

# Tech Stack

- Front End - React
- Back End - Node/Expres
- Database - PostgreSQL
