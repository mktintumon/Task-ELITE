import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/user", { withCredentials: true })
      .then((res) => {
        //console.log(res);
        setUserName(res.data.userName);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("No USER");
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          userName={userName}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route
            path="/signup"
            element={
              <Signup
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route
            path="/todo"
            element={<Todo isLoggedIn={isLoggedIn} userName={userName} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
