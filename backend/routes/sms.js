require("dotenv").config();
const express = require("express");
const router = express.Router();
const { sendMsg } = require("../lib/twilioCalls");
const accountSid = process.env.API_SID;
const authToken = process.env.TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendAlert = (msg, subscribedArr) => {
  const users = {
    1: process.env.DYLAN_PHONE,
    2: process.env.PABLO_PHONE,
    3: process.env.VINCE_PHONE,
  };

  subscribedArr.forEach((id) => {
    client.messages
      .create({
        body: msg,
        messagingServiceSid: "MG6248f8f8c8d88ad9b21408be2fe96eb7",
        to: users[id],
      })
      .then((message) => console.log("Message sent", message.sid))
      .done();
  });
};

module.exports = (db) => {
  // POST: Trigger text message
  router.post("/:user_id", (req, res) => {
    const { user_id } = req.params;
    console.log(`user_id: ${user_id}`);
    const { msg } = req.body;
    console.log(`message: ${msg}`);
    sendMsg(msg, user_id);
  });

  router.post("/", (req, res) => {
    const { msg, subscribedArr } = req.body;
    sendAlert(msg, subscribedArr);
  });

  return router;
};
