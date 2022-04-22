import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloTasksCard from "./TrelloTasksCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { tasksContext } from "../../Providers/TasksProvider";

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

export default function TrelloTasks() {
  // const [userTasks, setUserTasks] = useState([]);
  const { userTasks, setUserTasks } = useContext(tasksContext);

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
    // axios
    //   .get("/api/tasks")
    //   .then((response) => {
    //     const allTasks = response.data.tasks;

    // console.log("ALLTASKS: ", allTasks);

    const cards = userTasks.map((task) => {
      return {
        project_id: String(task.project_id),
        priority: String(task.priority),
        assignee_id: String(task.assignee_id),
        name: String(task.name),
        description: String(task.description),
        start_date: String(task.start_date),
        due_date: String(task.due_date),
        modified_date: String(task.modified_date),
        status: String(task.status),
        category_id: String(task.category_id),
        is_active: String(task.is_active),
        id: String(task.id),
      };
    });

    // console.log("allTaskObj: ", allTaskObj);

    for (let column in trelloColumns) {
      for (let j = 0; j < cards.length; j++) {
        // console.log(trelloColumns[column].title);
        // console.log(allTaskObj[j].progress);
        if (trelloColumns[column].title === cards[j].status)
          trelloColumns[column].items.push(cards[j]);
      }
    }

    // console.log("trelloColumns: ", trelloColumns);

    setUserTasks(cards);
    // });
    //     .catch((err) => console.log("err:", err));
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      // updates status for particular task being moved to different column
      removed.status = destColumn.title;
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
      const movedItemId = removed.id;
      // const movedStatus = removed.status;
      // console.log("SOURCEITEMS: ", sourceItems);
      // console.log("DESTITEMS: ", destItems);
      // console.log("ITEM STATUS THAT CHANGES: ", movedStatus);
      // console.log("SOURCECOLUMN: ", sourceColumn);
      // console.log("DESTCOLUMN: ", destColumn);
      // console.log("ITEMID THAT CHANGES: ", movedItemId);
      // console.log("REMOVED: ", removed);

      axios
        .put(`/api/tasks/${movedItemId}`, removed)
        .then((response) => {
          // const allTasks = response.data.task;
          // console.log(userTasks);
          // setUserTasks(userTasks);
          // let allTaskObj = [];
          // console.log("ALLTASKS: ", allTasks);
          // console.log("SUCCESSFUL EDIT RQST: ", allTasks);
        })
        .catch((err) => console.log("err:", err));
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
                      <TrelloTasksCard
                        key={item.id}
                        item={item}
                        index={index}
                      />
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
}
