import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TrelloProjectsCard from "./TrelloProjectsCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { projectsContext } from "../../Providers/ProjectsProvider";

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
  const { userProjects, setUserProjects } = useContext(projectsContext);

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
    //   .get("/api/projects")
    //   .then((response) => {
    //     const allProjects = response.data.projects;

    // console.log("ALLTASKS: ", allTasks);

    const cards = userProjects.map((project) => {
      // console.log("cards PDUEDATE1: ", project.due_date);
      return {
        id: String(project.id),
        category_id: String(project.category_id),
        owner_id: String(project.owner_id),
        name: String(project.name),
        description: String(project.description),
        start_date: String(project.start_date),
        due_date: String(project.due_date),
        modified_date: String(project.modified_date),
        status: String(project.status),
        is_active: String(project.is_active),
      };
    });

    // console.log("allProjectsObj: ", allProjectsObj);

    for (let column in trelloColumns) {
      for (let j = 0; j < cards.length; j++) {
        // console.log(trelloColumns[column].title);
        // console.log(allProjectsObj[j].status);
        if (trelloColumns[column].title === cards[j].status)
          trelloColumns[column].items.push(cards[j]);
      }
    }

    // console.log("trelloColumns: ", trelloColumns);

    setUserProjects(cards);
    // })
    // .catch((err) => console.log("err:", err));
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    // console.log("RESULT: ", result);
    // console.log("DESTINATION INDEX: ", result.destination.index);
    // console.log("COLUMNS: ", columns);

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

      // TEST START
      result.source.index = result.destination.index;
      result.destination.index = null;
      // console.log("NEWRESULT: ", result);
      // TEST END

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
        .put(`/api/projects/${movedItemId}`, removed)
        .then((response) => {
          // setUserProjects(userProjects);
          // const allProjects = response.data.project;
          // let allProjectsObj = [];
          // console.log("ALLPROJECTS: ", allProjects);
          // console.log("SUCCESSFUL EDIT RQST: ", allProjects);
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
                      <TrelloProjectsCard
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
