const express = require("express");
const router = express.Router();
const sendMsg = require("../lib/twilioCalls");

module.exports = (db) => {
  // POST: Trigger text message
  router.post("/:user_id", (req, res) => {
    const { user_id } = req.params;
    const { msg } = req.body;
    sendMsg(msg, user_id);
  });

  return router;
};
