import { createContext, useState } from "react";

export const viewsContext = createContext();

export default function ViewsProvider(props) {
  const [viewValue, setViewValue] = useState("List");

  // returns component based on view option
  // function view() {
  //   if (viewValue === "List") {
  //     setViewValue("List");
  //     return <ProjectTable />;
  //   } else if (viewValue === "Board") {
  //     setViewValue("Board");
  //     return <TrelloProjects />;
  //   }
  // }

  const userData = {
    // view,
    viewValue,
    setViewValue,
  };

  return (
    <viewsContext.Provider value={userData}>
      {props.children}
    </viewsContext.Provider>
  );
}
