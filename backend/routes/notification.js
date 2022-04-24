require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendAlert } = require("../lib/twilioAlert");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const { message, recipients } = req.body;
    sendAlert(message, recipients);
  });

  return router;
};
