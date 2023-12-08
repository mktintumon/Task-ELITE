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
  const [userId, setUserId] = useState(0);

  const googleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8081/user", {
        withCredentials: true,
      });
      setUserName(response.data.userName);
      setUserId(response.data.userId);
      setIsLoggedIn(true);
    } catch (err) {
      console.log("NO USER FOUND");
      setIsLoggedIn(false);
    }
  };

  const manualLogin = async () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    setUserName(localStorage.getItem("username"));
    setUserId(localStorage.getItem("userId"));
    //window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("userId") != null) {
      manualLogin();
    } else {
      googleLogin();
    }
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
              isLoggedIn ? (
                <Todo userId={userId} />
              ) : (
                <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Todo userId={userId} />
              ) : (
                <Login isLoggedIn={isLoggedIn} />
              )
            }
          />

          <Route
            path="/todo"
            element={
              isLoggedIn ? (
                <Todo userId={userId} />
              ) : (
                <Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
