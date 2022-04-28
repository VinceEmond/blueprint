import { createContext, useState } from "react";

export const viewsContext = createContext();

export default function ViewsProvider(props) {
  const [viewValue, setViewValue] = useState("List");

  const userData = {
    viewValue,
    setViewValue,
  };

  return (
    <viewsContext.Provider value={userData}>
      {props.children}
    </viewsContext.Provider>
  );
}
