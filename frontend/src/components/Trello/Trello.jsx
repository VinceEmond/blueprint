import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
// import { trelloColumns, data } from "./TrelloData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloCard from "./TrelloCard";
import axios from "axios";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
  justify-content: center;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Trello = () => {
  const [userTasks, setUserTasks] = useState([]);
  let loading = false;

  const trelloColumns = {
    [uuidv4()]: {
      title: "Not Started",
      items: [],
    },
    [uuidv4()]: {
      title: "In Progress",
      items: [],
    },
    [uuidv4()]: {
      title: "Pending",
      items: [],
    },
    [uuidv4()]: {
      title: "Complete",
      items: [],
    },
  };

  const [columns, setColumns] = useState(trelloColumns);

  useEffect(() => {
    if (!loading) {
      loading = true;
      axios
        .get("/api/tasks/")
        .then((response) => {
          const allTasks = response.data.tasks;
          let allTaskObj = [];

          // console.log("ALLTASKS: ", allTasks);

          const cards = allTasks.map((task) => {
            let card = {
              id: String(task.id),
              Task: String(task.name),
              Description: String(task.description),
              Status: String(task.status),
              Priority: String(task.priority),
              Due_Date: String(task.due_date),
            };
            return allTaskObj.push(card);
          });

          // console.log("allTaskObj: ", allTaskObj);

          for (let column in trelloColumns) {
            for (let j = 0; j < allTaskObj.length; j++) {
              // console.log(trelloColumns[column].title);
              // console.log(allTaskObj[j].progress);
              if (trelloColumns[column].title === allTaskObj[j].Status)
                trelloColumns[column].items.push(allTaskObj[j]);
            }
          }

          // console.log("trelloColumns: ", trelloColumns);

          setUserTasks(cards);
        })
        .catch((err) => console.log("err:", err));
    }
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TrelloCard key={item} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Trello;
