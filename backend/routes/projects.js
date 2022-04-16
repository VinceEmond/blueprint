const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // GET: BROWSE --- RETRIEVE ALL PROJECTS
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM projects;`;

    db.query(queryStr, queryParams)
      .then(data => {
        const projects = data.rows;
        res.json({ projects });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // GET: READ --- RETRIEVE SPECIFIC PROJECT BY ID
  router.get('/:id', (req, res) => {
    const {id} = req.params;
    const queryParams = [id];
    const queryStr = `SELECT * FROM projects WHERE id = $1;`;

    db.query(queryStr, queryParams)
      .then(data => {
        const project = data.rows;
        res.json({ project });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // name, description, start_date, due_date, modified_date, status, category_id
  // POST: EDIT - PROJECTS --- EDIT/UPDATE DATA FOR SPECIFIC PROJECT
  router.post("/:id", (req,res) => {
    const {id} = req.params;
    const {name, description, start_date, due_date, modified_date, status, category_id} = req.body;
    const queryParams = [name, description, start_date, due_date, modified_date, status, category_id, id];
    const queryStr = `UPDATE projects SET
      name = $1,
      description = $2,
      start_date = $3,
      due_date = $4,
      modified_date = $5,
      status = $6,
      category_id = $7
      WHERE id = $8
      RETURNING *
      `;

    db.query(queryStr, queryParams)
      .then(data => {
        const project = data.rows;
        res.json({ project });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // POST: ADD - PROJECTS --- ADD/CREATE A NEW
  router.post("/", (req,res) => {
    const {owner_id, category_id, name, description, due_date, modified_date, start_date, status} = req.body;
    const queryParams = [owner_id, category_id, name, description, due_date, modified_date, start_date, status];
    const queryStr = `INSERT INTO projects (owner_id, category_id, name, description, due_date, modified_date, start_date, status) VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8);`;

    db.query(queryStr, queryParams)
      .then(data => {
        const project = data.rows;
        res.json({ project });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
