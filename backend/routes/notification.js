require("dotenv").config();
const express = require("express");
const router = express.Router();
const accountSid = process.env.API_SID;
const authToken = process.env.TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = () => {
  router.post("/", (req, res) => {
    const { message, recipients } = req.body;

    const users = {
      1: process.env.DYLAN_PHONE,
      2: process.env.PABLO_PHONE,
      3: process.env.VINCE_PHONE,
    };

    recipients.forEach((id) => {
      client.messages
        .create({
          body: message,
          messagingServiceSid: "MG6248f8f8c8d88ad9b21408be2fe96eb7",
          to: users[id],
        })
        .then((message) => {
          console.log("Twillio message sent succesfully : ", message.sid);
          res.status(200).send(message.sid);
        })
        .catch((err) => {
          console.log("Twilio error:", err);
          res.status(500).send(err);
        });
    });
  });

  return router;
};
