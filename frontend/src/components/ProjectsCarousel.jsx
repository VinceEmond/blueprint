import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Box, Flex, Spacer } from '@chakra-ui/react';

export default function ProjectsCarousel() {
  return (
    <div>
      <Carousel
        display="flex"
        alignSelf="center"
        infiniteLoop="true"
        showThumbs={false}>
        <Flex mt={5} alignContent="center" height="100%" width="100%">
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
        </Flex>
        <Flex mt={5} alignContent="center" height="100%" width="100%">
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
        </Flex>
        <Flex mt={5} alignContent="center" height="100%" width="100%">
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
        </Flex>
        <Flex mt={5} alignContent="center" height="100%" width="100%">
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
          <Spacer />
          <Box height="200px" flex="5" border="1px">
            Testing
          </Box>
        </Flex>
      </Carousel>
    </div>
  );
}
