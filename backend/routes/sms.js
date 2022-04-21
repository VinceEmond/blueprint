const express = require("express");
const router = express.Router();
const { sendMsg } = require("../lib/twilioCalls");

module.exports = (db) => {
  // POST: Trigger text message
  router.post("/:user_id", (req, res) => {
    const { user_id } = req.params;
    console.log(`user_id: ${user_id}`);
    const { msg } = req.body;
    console.log(`message: ${msg}`);
    sendMsg(msg, user_id);
  });

  return router;
};
