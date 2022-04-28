import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const usersContext = createContext();

export default function UsersProvider(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [allUsers, setAllUsers] = useState([]);

  const getUserByID = (id) => {
    const arraySingleUser = allUsers.filter((user) => user.id === Number(id));
    return arraySingleUser[0];
  };

  // Retrieve all users
  useEffect(() => {
    axios
      .get("/api/users")
      .then((response) => {
        setAllUsers(response.data.users);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  // Sets specific user by using cookie ID
  useEffect(() => {
    setCurrentUser(getUserByID(cookies.id));
  }, [allUsers]);

  const login = function (id) {
    setCookie("id", id, { path: "/" });
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
