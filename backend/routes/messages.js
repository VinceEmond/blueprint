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

  // POST: ADD - MESSAGE --- ADD/CREATE A NEW MESSAGE
  router.post("/", (req, res) => {
    // console.log("REQBODY:", req.body);
    const { sender_id, content, time_stamp } = req.body;
    const queryParams = [sender_id, content, time_stamp];
    // console.log("QUERYPARAMS: ", queryParams);

    const queryStr = `INSERT INTO messages (sender_id, content, time_stamp, is_active) VALUES ($1, $2, $3, true) RETURNING *;`;
    // const queryStr = `INSERT INTO messages (sender_id, content, time_stamp, is_active) VALUES
    // (1, 'Good morning!', '2016-06-22 19:10:11', true);`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const message = data.rows[0];
        console.log("Data.rows[0]", data.rows);
        res.json({ message });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
