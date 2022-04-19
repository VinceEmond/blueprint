import React from "react";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";

export default function ProjectTable(props) {
  const { userProjects } = props;
  const projectColumn = ["Name", "Owner", "Due Date", "Status"];

  const projectHeader = projectColumn.map((column, index) => {
    return <Th key={index}>{column}</Th>;
  });
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue" size="lg">
        <Thead>
          <Tr>{projectHeader}</Tr>
        </Thead>
        <Tbody>{userProjects}</Tbody>
      </Table>
    </TableContainer>
  );
}
