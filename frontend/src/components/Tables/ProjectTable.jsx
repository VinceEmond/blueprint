import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Container,
  Center,
} from "@chakra-ui/react";

export default function ProjectTable(props) {
  const { projectList } = props;
  const projectColumn = ["Name", "Owner", "Due Date", "Status"];

  const projectHeader = projectColumn.map((column, index) => {
    return <Th key={index}>{column}</Th>;
  });
  return (
    <Center>
      <Container borderWidth="1px" borderRadius="lg" maxW="8xl">
        <TableContainer>
          <Table variant="striped" colorScheme="blue" size="lg">
            <Thead>
              <Tr>{projectHeader}</Tr>
            </Thead>
            <Tbody>{projectList}</Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Center>
  );
}
