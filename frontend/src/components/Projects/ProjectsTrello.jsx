import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProjectsTrelloCard from "./ProjectsTrelloCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { updateTrelloProjectStatus } from "../../helpers/selectors";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: rgba(10, 23, 30, 1);
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 0.4em;
  border: solid white 2px;
  border-radius: 5px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
  justify-content: center;
`;

const Title = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1.3em;
  background: rgba(10, 23, 30, 1);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

export default function ProjectsTrello({ modalState, onEdit }) {
  const [columns, setColumns] = useState({});
  const { userProjects, setUserProjects } = useContext(projectsContext);

  useEffect(() => {
    const cards = userProjects.map((project) => {
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

    const updatedTrelloColumns = {
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

    for (let column in updatedTrelloColumns) {
      for (let j = 0; j < cards.length; j++) {
        if (updatedTrelloColumns[column].title === cards[j].status)
          updatedTrelloColumns[column].items.push(cards[j]);
      }
    }

    setColumns(updatedTrelloColumns);
  }, [modalState, userProjects]);

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

      axios
        .put(`/api/projects/${movedItemId}`, removed)
        .then((response) => {
          const updatedProjectArr = updateTrelloProjectStatus(
            userProjects,
            removed
          );
          setUserProjects(updatedProjectArr);
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
                      <ProjectsTrelloCard
                        key={item.id}
                        item={item}
                        index={index}
                        onEdit={onEdit}
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
