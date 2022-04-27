import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import NaturalDragAnimation from "natural-drag-animation-rbdnd";
import HighPriorityIcon from "../../assets/icons/HighPriorityIcon.png";
import MediumPriorityIcon from "../../assets/icons/MediumPriorityIcon.png";
import LowPriorityIcon from "../../assets/icons/LowPriorityIcon.png";
import { EditIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Divider,
} from "@chakra-ui/react";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: ${({ isDragging }) =>
    isDragging ? "rgba(255, 59, 59, 0.15)" : "white"};
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: black;
  }
  .status{
    display: flex;
  }
   .priority{ 
    display:flex;
    img{
      width: 20px !important;
      height: 20px !important;
      margin-right: 1px; */
   margin-top: 2px; */
   } 
   } 
`;

export default function TasksTrelloCard({ item, index, onEdit }) {
  return (
    <Draggable
      key={String(item.id)}
      draggableId={String(item.id)}
      index={index}
    >
      {(provided, snapshot) => (
        <NaturalDragAnimation
          style={provided.draggableProps.style}
          snapshot={snapshot}
        >
          {(style) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={style}
            >
              <TaskInformation
                style={{
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                  <div style={{ display: "flex" }}>
                    {
                      <span className="priority" style={{ marginTop: "12px" }}>
                        {item.priority === "High" ? (
                          <img
                            src={HighPriorityIcon}
                            alt="High Priority Icon"
                          />
                        ) : item.priority === "Medium" ? (
                          <img
                            src={MediumPriorityIcon}
                            alt="Medium Priority Icon"
                          />
                        ) : (
                          <img src={LowPriorityIcon} alt="Low Priority Icon" />
                        )}
                      </span>
                    }
                    <Menu bg="white">
                      <MenuButton bg="white" as={Button}>
                        {<EditIcon />}
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={(e) => onEdit(item)}>Edit</MenuItem>
                        <MenuItem>Delete</MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                </div>
                <Divider />
                <p>{item.description}</p>
                <Divider
                  style={{
                    width: "60%",
                    display: "flex",
                    alignSelf: "center",
                  }}
                />
                <div
                  className="secondary-details"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <span className="status">
                    Due:{" "}
                    {new Date(item.due_date).toLocaleDateString("en-us", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </TaskInformation>
            </div>
          )}
        </NaturalDragAnimation>
      )}
    </Draggable>
  );
}
