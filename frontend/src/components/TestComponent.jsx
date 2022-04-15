import React, { Component, useState } from "react";
import axios from "axios";
import "./App.css";

export default function TestComponent() {
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("/api/users") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        setData(response.data.users);
      })
      .catch((err) => console.log("err:", err));
    // console.log("Button Pressed");
  };

  const list = data.map((item) => {
    return <li key={item.id}>{item.first_name}</li>;
  });

  return (
    <div>
      <button onClick={fetchData}>CLICK ME</button>
      <ul>{list}</ul>
    </div>
  );
}
