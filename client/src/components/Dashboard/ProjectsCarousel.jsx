import React, { useEffect, useState, useContext } from "react";
import "./Carousel.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CCarousel } from "@coreui/react";
import { CCarouselItem } from "@coreui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import { projectsContext } from "../../Providers/ProjectsProvider";
import { usersContext } from "../../Providers/UsersProvider";
import { tasksContext } from "../../Providers/TasksProvider";
import {
  getUserSpecificProjects,
  getUserSpecificTasks,
} from "../../helpers/selectors";

export default function ProjectsCarousel({ onEdit }) {
  const { userProjects } = useContext(projectsContext);
  const { cookies } = useContext(usersContext);
  const { userTasks } = useContext(tasksContext);
  const [projectBoxes, setProjectBoxes] = useState([]);
  const USER_ID = Number(cookies.id);

  useEffect(() => {
    const allProjects = userProjects || [];
    const userSpecificTasks = getUserSpecificTasks(userTasks, USER_ID);
    const userSpecificProjects = getUserSpecificProjects(
      allProjects,
      userSpecificTasks,
      USER_ID
    );

    const cards = userSpecificProjects.map((project) => {
      return (
        <ProjectCard key={`p${project.id}`} project={project} onEdit={onEdit} />
      );
    });
    setProjectBoxes(cards);
  }, [userProjects, userTasks]);

  function listProjectFlexes() {
    const flexes = [];
    let cards;
    let count = 0;
    for (const box of projectBoxes) {
      count++;
      if (count % 3 === 1) {
        cards = [];
      }
      cards.push(box);
      if (count % 3 === 0 || count === projectBoxes.length) {
        const MARGIN = count % 3 !== 0 ? "auto" : 0;
        const WIDTH =
          count % 3 === 0 ? "100%" : count % 3 === 2 ? "66%" : "33%";
        const flex = (
          <Flex
            mt={5}
            marginLeft={MARGIN}
            marginRight={MARGIN}
            display="flex"
            alignContent="center"
            height="100%"
            width={WIDTH}
            key={`f${count}`}
          >
            {cards}
          </Flex>
        );
        flexes.push(flex);
      } else {
        const spacer = <Spacer key={`spacer${count}`} />;
        cards.push(spacer);
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
  }

  return <div>{listProjectFlexes()}</div>;
}
