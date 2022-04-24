const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: BROWSE --- RETRIEVE ALL USERS
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM users;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: READ --- RETRIEVE SPECIFIC USER BY ID
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    const queryParams = [id];
    const queryStr = `SELECT * FROM users WHERE id = $1;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // PUT: EDIT --- UPDATE DATA FOR SPECIFIC USER ID
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { text_alert } = req.body;
    const queryParams = [id, text_alert];
    const queryStr = `UPDATE users SET text_alert = $2 WHERE id = $1 RETURNING *;`;

    console.log("Query Params", queryParams);

    db.query(queryStr, queryParams)
      .then((data) => {
        const user = data.rows[0];
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
