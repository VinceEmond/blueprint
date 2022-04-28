# User Stories

## Template

As a **\_\_\_\_\_\_**, I want to **\_\_\_\_\_\_**, because **\_\_\_\_\_\_**.

---

### High Priority Stories

1. As a user, I want to be able to make a project because I would like to track tasks for that project
2. As a user, I want to add tasks to a given project because it breaks down the project into smaller pieces
3. As a user, for any given task I want to be able to add details about the task (assign someone to it, status (not started / in progress / pending / completed) , priority level (low / medium / high), start date, due date, description and specify the project it belongs to) because detailed information is required to accurately manage tasks
4. As a user, for any given project I want to be able to add details about the project (owner, status (not started / in progress / pending / completed) , priority level (low / medium / high), start date, due date, and description)
5. As a user, I want to be able to edit, update, and delete any tasks or projects because needs may change
6. As a user, I want to be able to see all tasks because I may be interested or may even need to take on tasks set for other people
7. As a user, I want to be able to see all projects because I may be interested or may even need to take on projects set for other people

### Stretch

1. As a user, I want to only see tasks for projects I am involved in because I am only interested in work relating to me - Completed

### Super-Stretch (Diagrams / Graphs / Metrics)

1. As a project owner, I want a separate project owner dashboard because I need to keep track of all tasks and completion statuses to allocate resources accordingly
2. As a user, I want a chat capability to converse with teammates because it means I don't have to use another communication app - Completed
3. As a user, I want to sort and filter tasks/projects because it allows me to prioritize work more quickly

---

# Resources (ie: nouns)

- Users
- Projects
- Tasks
- Messages
- Notifications

---

# Routes

Index

- / (Home Page)

Users

- B GET /api/users/
- R GET /api/users/:id
- ~~E PUT /api/users/:id~~ (Not needed for MVD)
- ~~A POST /api/users/~~ (Not needed for MVD)
- ~~D PUT /api/users/:id/delete~~ (Not needed for MVD)

Projects

- B GET /api/projects/
- R GET /api/projects/:id
- E PUT /api/projects/:id
- A POST /api/projects/
- D PUT /api/projects/:id/delete (Using is_active)

Tasks

- B GET /api/tasks/
- R GET /api/tasks/:id
- E PUT /api/tasks/:id
- A POST /api/tasks/
- D PUT /api/tasks/:id/delete (Using is_active)

Messages

- B GET /api/messages/
- R ~~GET /api/messages/:id~~ (Not needed for MVD)
- E ~~PUT /api/messages/:id~~ (Not needed for MVD)
- A POST /api/messages/
- D ~~PUT /api/messages/:id/delete (Using is_active)~~ (Not needed for MVD)

Notification

- B ~~GET /api/notification/~~ (Not needed for MVD)
- R ~~GET /api/notification/:id~~ (Not needed for MVD)
- E ~~PUT /api/notification/:id~~ (Not needed for MVD)
- A POST /api/notification/
- D ~~PUT /api/notification/:id/delete (Using is_active)~~ (Not needed for MVD)

# Tech Stack

- Front End - React
- Back End - Node/Express
- Database - PostgreSQL
