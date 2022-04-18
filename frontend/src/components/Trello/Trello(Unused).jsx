import React, { useState, useEffect } from "react";
import Board from "react-trello";
import axios from "axios";
import moment from "moment";

let data = {
  lanes: [
    {
      id: "1",
      title: "Not Started",
      label: "0/0",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      label: "0/0",
      cards: [],
    },
    {
      id: "3",
      title: "Pending",
      label: "0/0",
      cards: [],
    },
    {
      id: "4",
      title: "Complete",
      label: "0/0",
      cards: [],
    },
  ],
};

// {
//   id: "Card1",
//   title: "Write Blog",
//   description: "Can AI make memes",
//   label: "30 mins",
// },
// {
//   id: "Card2",
//   title: "Pay Rent",
//   description: "Transfer via NEFT",
//   label: "5 mins",
// },

export default function Trello() {
  const [userTasks, setUserTasks] = useState([]);
  let loading = false;

  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get("/api/tasks/")
        .then((response) => {
          const allTasks = response.data.tasks;

          let allTaskObj = [];

          const cards = allTasks.map((task) => {
            let date = moment(task.due_date).utc().format("YYYY-MM-DD");

            let card = {
              key: task.id,
              description: task.description,
              id: String(task.id),
              label: "Due: " + date,
              progress: task.status,
              title: task.name,
            };
            return allTaskObj.push(card);
          });

          // loop through data lanes
          for (let i = 0; i < data.lanes.length; i++) {
            // loop through object that is structured to look like the object Board receives
            for (let j = 0; j < allTaskObj.length; j++) {
              // if status for lane matches task status
              if (data.lanes[i].title === allTaskObj[j].progress) {
                // push into object
                data.lanes[i].cards.push(allTaskObj[j]);
              }
            }
          }

          // updates trello board count
          for (let k = 0; k < data.lanes.length; k++) {
            let cardNumber = data.lanes[k].cards.length;
            let totalNumber = data.lanes[k].cards.length;
            data.lanes[k].label = cardNumber + "/" + totalNumber;
          }

          setUserTasks(cards);
        })
        .catch((err) => console.log("err:", err));
    }
  }, []);

  return (
    <Board
      data={data}
      draggable
      editable
      style={{ backgroundColor: "white", justifyContent: "center" }}
      onCardAdd={function noRefCheck() {}}
      onCardClick={function noRefCheck() {}}
      onCardDelete={function noRefCheck() {}}
      onDataChange={function noRefCheck() {}}
    />
  );
}
