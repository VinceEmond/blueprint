import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Box, Flex, Spacer } from '@chakra-ui/react';

export default function ProjectsCarousel() {
  return (
    <Carousel>
      <Flex>
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
      </Flex>
      <Flex>
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
      </Flex>
      <Flex>
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
        <Spacer />
        <Box>Testing</Box>
      </Flex>
    </Carousel>
  );
}
