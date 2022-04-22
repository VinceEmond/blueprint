import React, { useEffect, useState, useContext } from "react";
import "./Carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import SocialProfileSimple from "./ProjectCard";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import {
  getUserSpecificProjects,
  getUserSpecificTasks,
} from "../../helpers/selectors";

export default function ProjectsCarousel() {
  const { userProjects } = useContext(projectsContext);
  const { cookies } = useContext(usersContext);
  const { userTasks } = useContext(tasksContext);
  const [projectBoxes, setProjectBoxes] = useState([]);

  useEffect(() => {
    const user_id = Number(cookies.id);
    const allProjects = userProjects ? userProjects : [];
    const userSpecificTasks = getUserSpecificTasks(userTasks, user_id);
    const userSpecificProjects = getUserSpecificProjects(
      allProjects,
      userSpecificTasks,
      user_id
    );
    const boxes = userSpecificProjects.map((project) => {
      return (
        <SocialProfileSimple
          key={`p${project.id || project.description.length * 100}`}
          project={project}
        />
      );
    });
    setProjectBoxes(boxes);
  }, [userProjects, userTasks]);

  const listProjectFlexes = () => {
    const flexes = [];
    let boxes;
    let count = 0;
    for (const box of projectBoxes) {
      count++;
      if (count % 3 === 1) {
        boxes = [];
      }
      boxes.push(box);
      if (count % 3 === 0 || count === projectBoxes.length) {
        const flex = (
          <Flex
            mt={5}
            marginLeft={`${count % 3 !== 0 ? "auto" : 0}`}
            marginRight={`${count % 3 !== 0 ? "auto" : 0}`}
            display="flex"
            alignContent="center"
            height="100%"
            width={`${count % 3 === 0 ? 100 : count % 3 === 2 ? 66 : 33}%`}
            key={`f${count}`}
          >
            {boxes}
          </Flex>
        );
        flexes.push(flex);
      } else {
        const spacer = <Spacer key={`spacer${count}`} />;
        boxes.push(spacer);
      }
    }
    return (
      <CCarousel
        indicators={true}
        controls={true}
        interval={false}
        dark={true}
        wrap={true}
        pause={"hover"}
        key={`carousel${1}`}
      >
        {flexes.map((flex, index) => {
          return (
            <CCarouselItem key={`flex${index}`} className="w-100">
              {flex}
            </CCarouselItem>
          );
        })}
      </CCarousel>
    );
  };

  return <div>{listProjectFlexes()}</div>;
}
