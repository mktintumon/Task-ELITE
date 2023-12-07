import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = ({isLoggedIn}) => {
  const navigateTo = useNavigate();
  return (
    <div className="container">
      <div className="centered-content">
        <h1>Welcome to Task ELITE</h1>
        <img
          src="https://imgs.search.brave.com/TCW4BrTpL7DTUM7ev3SXlQNpiMnv17L1A2OIM-u6-L8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NTMwODI0Mi9waG90/by90by1kby1saXN0/LXRleHQtb24tbm90/ZXBhZC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9cDg1YkNW/UVp3dmtycXFxTk9K/R2cyUXVQRHU2eW5U/bFFIa0FTUU9URUxo/OD0"
          alt="Todo List"
          className="todo-image"
        />
        {isLoggedIn ? (
          <h3>
            <Link
              onClick={navigateTo("/todo")}
            >
              <u>Go to Todo dashboard</u>
            </Link>
          </h3>
        ) : (
          <h3>Please Login/Register To Create Your Todo</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
