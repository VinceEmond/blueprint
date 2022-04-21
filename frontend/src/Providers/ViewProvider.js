import { createContext, useState } from "react";
import ProjectTable from "../components/Tables/ProjectTable";
import TrelloProjects from "../components/Trello/TrelloProjects";

export const viewsContext = createContext();

export default function ViewsProvider(props) {
  const [viewValue, setViewValue] = useState("List");

  // returns component based on view option
  function View() {
    //   if (viewValue === "List") {
    //     return <ProjectTable projectList={projectList} />;
    //   } else if (viewValue === "Board") {
    //     return <TrelloProjects />;
    //   }
  }

  const userData = {
    // view,
    // viewValue,
  };

  return (
    <viewsContext.Provider value={userData}>
      {props.children}
    </viewsContext.Provider>
  );
}
