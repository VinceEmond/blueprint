const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  // GET: BROWSE --- RETRIEVE ALL TASKS
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM tasks;`;

    db.query(queryStr, queryParams)
      .then(data => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // GET: READ --- RETRIEVE SPECIFIC TASK BY ID
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    const queryParams = [id];
    const queryStr = `SELECT * FROM tasks WHERE id = $1;`;

    db.query(queryStr, queryParams)
      .then(data => {
        const task = data.rows;
        res.json({ task });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // POST: EDIT - TASKS --- EDIT/UPDATE DATA FOR SPECIFIC TASK
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    const queryParams = [project_id, user_id, name, description, category_id, status, start_date, due_date, modified_date, priority, id];
    const queryStr = `UPDATE tasks SET
    project_id = $1,
    user_id = $2,
    name = $3,
    description = $4,
    category_id = $5,
    status = $6,
    start_date = $7,
    due_date = $8,
    modified_date = $9,
    priority = $10
    WHERE id = $11
    RETURNING *;`;

    db.query(queryStr, queryParams)
      .then(data => {
        const task = data.rows;
        res.json({ task });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // POST: ADD - TASKS --- ADD/CREATE A NEW TASK
  router.get('/', (req, res) => {
    const {user_id, category_id, project_id, name, description, due_date, modified_date, start_date, priority, status} = req.body;
    const queryParams = [user_id, category_id, project_id, name, description, due_date, modified_date, start_date, priority, status];
    const queryStr = `INSERT INTO tasks (user_id, category_id, project_id, name, description, due_date, modified_date, start_date, priority, status) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

    db.query(queryStr, queryParams)
      .then(data => {
        const task = data.rows;
        res.json({ task });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};

