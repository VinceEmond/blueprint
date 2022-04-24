require("dotenv").config();
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
      .then((res) =>
        console.log("Twillio message sent succesfully : ", res.sid);
        res.status(200).send(message.sid);
      )
      .done();
  });
};

module.exports = { sendAlert };
