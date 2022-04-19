import React, { useEffect, useState } from 'react';
import './Carousel.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCarousel } from '@coreui/react';
import { CCarouselItem } from '@coreui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import SocialProfileSimple from './ProjectCard';
import axios from 'axios';

export default function ProjectsCarousel() {
  const [projectBoxes, setProjectBoxes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/projects')
      .then((response) => {
        const allProjects = response.data.projects;
        const projectBoxes = allProjects.map((project) => {
          return <SocialProfileSimple key={project.id} project={project} />;
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
            marginLeft={`${count % 3 !== 0 ? 'auto' : 0}`}
            marginRight={`${count % 3 !== 0 ? 'auto' : 0}`}
            display="flex"
            alignContent="center"
            height="100%"
            width={`${count % 3 === 0 ? 100 : count % 3 === 2 ? 66 : 33}%`}
            key={count}>
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
        marginLeft="50px"
        pause={'hover'}>
        {flexes.map((flex, index) => {
          console.log('NEW ROW');
          return (
            <CCarouselItem key={index} className="w-100">
              {flex}
            </CCarouselItem>
          );
        })}
      </CCarousel>
    );
  };

  return <div>{listProjectFlexes()}</div>;
}
