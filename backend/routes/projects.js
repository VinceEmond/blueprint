const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: BROWSE --- RETRIEVE ALL PROJECTS
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM projects WHERE is_active = true;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const projects = data.rows;
        res.json({ projects });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: READ --- RETRIEVE SPECIFIC PROJECT BY ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryStr = `SELECT * FROM projects WHERE id = $1 AND is_active = true;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const project = data.rows;
        res.json({ project });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: BROWSE --- RETRIEVE ALL TASKS FOR SPECIFIC PROJECT ID
  // router.get("/:id/tasks", (req, res) => {
  //   const { id } = req.params;
  //   const queryParams = [id];
  //   const queryStr = `SELECT * FROM tasks WHERE project_id = $1 AND is_active = true;`;

  //   db.query(queryStr, queryParams)
  //     .then((data) => {
  //       const tasks = data.rows;
  //       res.json({ tasks });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  // POST: EDIT - PROJECTS --- EDIT/UPDATE DATA FOR SPECIFIC PROJECT
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    console.log("REQ.BODY: ", req.body);
    const {
      owner_id,
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
      owner_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
      is_active,
      Number(id),
    ];
    console.log("PARAMS: ", queryParams);
    const queryStr = `UPDATE projects SET
    owner_id = $1,
    name = $2,
    description = $3,
    start_date = $4,
    due_date = $5,
    modified_date = $6,
    status = $7,
    category_id = $8,
    is_active = $9
    WHERE id = $10
    RETURNING *;
    `;

    db.query(queryStr, queryParams)
      .then((data) => {
        const project = data.rows;
        console.log("QUERY SUCCESS");
        res.json({ project });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // POST: ADD - PROJECTS --- ADD/CREATE A NEW
  router.post("/", (req, res) => {
    const {
      owner_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
    } = req.body;
    const queryParams = [
      owner_id,
      name,
      description,
      start_date,
      due_date,
      modified_date,
      status,
      category_id,
    ];
    const queryStr = `INSERT INTO projects
      (owner_id, name, description, start_date, due_date, modified_date, status, category_id) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
    `;

    db.query(queryStr, queryParams)
      .then((data) => {
        const project = data.rows;
        res.json({ project });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // POST:DELETE - PROJECTS --- SET EXISTING PROJECT TO INACTIVE IN DB
  router.delete("/:id/delete", (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryStr = `UPDATE projects SET
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
