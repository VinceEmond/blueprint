const { query } = require("express");
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: BROWSE --- RETRIEVE ALL TASKS
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM tasks WHERE is_active = true;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const tasks = data.rows;
        res.json({ tasks });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: READ --- RETRIEVE SPECIFIC TASK BY ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryStr = `SELECT * FROM tasks WHERE id = $1 AND is_active = true;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const task = data.rows;
        res.json({ task });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // PUT: EDIT - TASKS --- EDIT/UPDATE DATA FOR SPECIFIC TASK - USE PUT
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    console.log("REQ.BODY: ", req.body);
    const {
      project_id,
      priority,
      assignee_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
      is_active,
    } = req.body;
    const queryParams = [
      project_id,
      priority,
      assignee_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
      is_active,
      id,
    ];
    console.log("PARAMS: ", queryParams);
    const queryStr = `UPDATE tasks SET
      project_id = $1,
      priority = $2,
      assignee_id = $3,
      name = $4,
      description = $5,
      start_date = $6,
      due_date = $7,
      modified_date = $8,
      status = $9,
      category_id = $10,
      is_active = $11
      WHERE id = $12
      RETURNING *;
    `;

    db.query(queryStr, queryParams)
      .then((data) => {
        const task = data.rows;
        res.json({ task });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  // POST: ADD - TASKS --- ADD/CREATE A NEW TASK
  router.post("/", (req, res) => {
    // console.log("REQBODY:", req.body)

    const {
      project_id,
      priority,
      assignee_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
    } = req.body;

    const queryParams = [
      project_id,
      priority,
      assignee_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
    ];
    // console.log("QUERYPARAMS: ", queryParams)

    const queryStr = `INSERT INTO tasks
      (project_id, priority, assignee_id, name, description, start_date, due_date, modified_date, status, category_id) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    db.query(queryStr, queryParams)
      .then((data) => {
        const task = data.rows;
        // console.log('SUCCESSFUL')
        res.json({ task });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // POST:DELETE - TASKSK --- SET EXISTING TASK TO INACTIVE IN DB
  router.delete("/:id/delete", (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryStr = `UPDATE tasks SET
      is_active = false
      WHERE id = $1
      RETURNING *;
    `;

    db.query(queryStr, queryParams)
      .then((data) => {
        res.json({});
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
