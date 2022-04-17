import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';
import { Carousel } from 'react-responsive-carousel';
import { Badge, Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import SocialProfileSimple from './ProjectCard';
import axios from 'axios';

export default function ProjectsCarousel() {
  const [userProjects, setUserProjects] = useState([]);
  const [projectBoxes, setProjectBoxes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/projects')
      .then((response) => {
        const allProjects = response.data.projects;
        const projectBoxes = allProjects.map((project) => {
          return <SocialProfileSimple project={project} />;
        });
        setProjectBoxes(projectBoxes);
      })
      .catch((err) => console.log('err:', err));
  }, []);

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
            display="flex"
            alignContent="center"
            height="100%"
            key={count}>
            {boxes}
          </Flex>
        );
        flexes.push(flex);
      } else {
        const spacer = <Spacer />;
        boxes.push(spacer);
      }
    }
    return flexes;
  };

  return (
    <div>
      <Carousel
        display="flex"
        alignSelf="center"
        infiniteLoop="true"
        showThumbs="false"
        autoFocus="true"
        autoPlay="true"
        interval="5000"
        stopOnHover>
        {listProjectFlexes()}
      </Carousel>
    </div>
  );
}
