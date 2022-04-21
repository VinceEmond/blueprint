import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const usersContext = createContext();

export default function UsersProvider(props) {
  const [currentUser, setCurrentUser] = useState({ name: "default" });
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [allUsers, setAllUsers] = useState([]);

  const getUserByID = (id) => {
    const arraySingleUser = allUsers.filter((user) => user.id === Number(id));
    return arraySingleUser[0];
  };

  // When mounted, API call for DB query for all users and specific user's name when component renders
  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setAllUsers(response.data.users);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  useEffect(() => {
    //   // console.log("Retreived user from ID", getUserByID(cookies.id));
    // Only fire of cookie is set
    setCurrentUser(getUserByID(cookies.id));
  }, [allUsers]);

  const login = function (id) {
    setCookie("id", id, { path: "/" });
    // setCurrentUser(getUserByID(cookies.id));
  };

  const logout = function () {
    removeCookie("id");
  };

  const userData = {
    cookies,
    allUsers,
    setAllUsers,
    login,
    logout,
    getUserByID,
    currentUser,
    setCurrentUser,
  };

  return (
    <usersContext.Provider value={userData}>
      {props.children}
    </usersContext.Provider>
  );
}
