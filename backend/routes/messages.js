const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // GET: BROWSE --- RETRIEVE ALL MESSAGES
  router.get("/", (req, res) => {
    const queryParams = [];
    const queryStr = `SELECT * FROM messages;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const messages = data.rows;
        res.json({ messages });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET: READ --- RETRIEVE SPECIFIC USER BY ID
  // router.get('/:id', (req, res) => {
  //   const {id} = req.params;
  //   const queryParams = [id];
  //   const queryStr = `SELECT * FROM users WHERE id = $1;`;

  //   db.query(queryStr, queryParams)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};
