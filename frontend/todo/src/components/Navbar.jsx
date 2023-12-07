import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar({ isLoggedIn, userName, setIsLoggedIn }) {
  const navigateTo = useNavigate();

  const handleSignOut = async () => {
    try {
      window.location.replace("http://localhost:8081/logout");
      const res = await axios.get("http://localhost:8081/logout");
      console.log("hello");
      console.log(res.data);
      setIsLoggedIn(false);
      navigateTo("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" height="4">
        <Toolbar style={{ backgroundColor: "black", height: "4rem" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={() => navigateTo("/")}
            style={{ cursor: "pointer" }}
          >
            Task ELITE
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
                fontSize: "1.2rem",
                marginRight: "2rem",
              }}
            >
              <AccountCircleIcon />
              <p>{userName}</p>
            </div>
          )}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>

            {isLoggedIn ? (
              <Button
                size="small"
                style={{
                  backgroundColor: "whitesmoke",
                  color: "black",
                  width: "6rem",
                  height: "2.4rem",
                  fontWeight: "700",
                  marginTop: "0.2rem",
                  marginRight: "4rem",
                }}
                onClick={handleSignOut}
              >
                SIGN OUT
              </Button>
            ) : (
              <Button
                size="small"
                style={{
                  backgroundColor: "whitesmoke",
                  color: "black",
                  width: "10rem",
                  height: "2.6rem",
                  fontWeight: "700",
                  marginTop: "0.2rem",
                  marginRight: "4rem",
                }}
                onClick={() => navigateTo(isLoggedIn ? "/" : "/signup")}
              >
                LOGIN / REGISTER
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
