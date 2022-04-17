import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Badge, Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import axios from 'axios';

export default function ProjectsCarousel() {
  const [userProjects, setUserProjects] = useState([]);
  const [projectBoxes, setProjectBoxes] = useState([]);

  useEffect(() => {
    // console.log('dashboard projects testing');
    axios
      .get('/api/projects')
      .then((response) => {
        const allProjects = response.data.projects;
        const projectBoxes = allProjects.map((project) => {
          const statusColor =
            project.status === 'Complete' ? 'green' : 'yellow';
          return (
            <Box height="200px" flex="5" border="1px" key={project.id}>
              <Flex
                height="100%"
                justifyContent="center"
                flexDirection="column">
                <Box>
                  <Heading size="md">{project.name}</Heading>
                  <Badge fontSize="lg" colorScheme={statusColor}>
                    {project.status}
                  </Badge>
                </Box>
                <Box></Box>
              </Flex>
            </Box>
          );
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
      if (count % 3 === 0) {
        const flex = (
          <Flex
            mt={5}
            alignContent="center"
            height="100%"
            width="100%"
            key={count}>
            {boxes}
          </Flex>
        );
        flexes.push(flex);
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
        // autoPlay="true"
        interval="3000"
        stopOnHover="true">
        {listProjectFlexes()}
      </Carousel>
    </div>
  );
}
