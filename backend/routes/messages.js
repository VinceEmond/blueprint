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

  // POST: ADD - MESSAGE --- ADD/CREATE A NEW MESSAGE
  router.post("/", (req, res) => {
    const { sender_id, content, time_stamp } = req.body;
    const queryParams = [sender_id, content, time_stamp];
    const queryStr = `INSERT INTO messages (sender_id, content, time_stamp, is_active) VALUES ($1, $2, $3, true) RETURNING *;`;

    db.query(queryStr, queryParams)
      .then((data) => {
        const message = data.rows[0];
        res.json({ message });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
