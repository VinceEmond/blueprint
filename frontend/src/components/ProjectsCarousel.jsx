import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';
import { Carousel } from 'react-responsive-carousel';
import { Flex, Spacer } from '@chakra-ui/react';
import SocialProfileSimple from './ProjectCard';
import axios from 'axios';

export default function ProjectsCarousel() {
  const [projectBoxes, setProjectBoxes] = useState([]);
  // Prevent double api calls by checking if already loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
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
    }
  }, [loading]);

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
        const spacer = <Spacer key={`spacer${count}`} />;
        boxes.push(spacer);
      }
    }
    return (
      <Carousel
        display="flex"
        alignSelf="center"
        infiniteLoop={true}
        autoFocus={true}
        autoPlay={false}
        interval="5000"
        stopOnHover={true}
        showThumbs={false}>
        {flexes}
      </Carousel>
    );
  };

  return <div>{listProjectFlexes()}</div>;
}
