import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ProjectTrelloCard from "./ProjectTrelloCard";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { tasksContext } from "../../Providers/TasksProvider";
import { useParams } from "react-router-dom";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { updateTrelloTaskStatus } from "../../helpers/selectors";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: rgba(10, 23, 30, 0.8);
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin: 0.3em;
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

export default function ProjectTrello({ modalState, onEdit }) {
  const { userTasks, setUserTasks } = useContext(tasksContext);
  const { userProjects } = useContext(projectsContext);
  const { id } = useParams();

  const [columns, setColumns] = useState({});

  useEffect(() => {
    const cards = userTasks
      .filter((task) => {
        return task.project_id == Number(id);
      })
      .map((task) => {
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
  }, [modalState, userProjects, userTasks]);

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
        .put(`/api/tasks/${movedItemId}`, removed)
        .then((response) => {
          const updatedTaskArr = updateTrelloTaskStatus(userTasks, removed);
          setUserTasks(updatedTaskArr);
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
                      <ProjectTrelloCard
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
