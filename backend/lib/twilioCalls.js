require("dotenv").config();

// FUNCTIONS FOR SENDING SMS VIA TWILIO

const accountSid = process.env.API_SID;
const authToken = process.env.TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendMsg = (msg, userID) => {
  users = {
    1: process.env.DYLAN_PHONE,
    2: process.env.PABLO_PHONE,
    3: process.env.VINCE_PHONE,
  };
  client.messages
    .create({
      body: msg,
      messagingServiceSid: "MG6248f8f8c8d88ad9b21408be2fe96eb7",
      to: users[userID],
    })
    .then((message) => console.log(message.sid))
    .done();
};

module.exports = { sendMsg };
