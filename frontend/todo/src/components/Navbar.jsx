import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const userName = localStorage.getItem("userData");
  const key = "userData";
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(key) !== null
  );
  const navigateTo = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);

    navigateTo("/login");
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
            //onClick={() => navigateTo(isLoggedIn ? "/todo" : "/" , {state : {userId : localStorage.getItem("userId")} } )}
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
              <p>{userName?.substring(1, userName.length - 1)}</p>
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
                  width: "5rem",
                  height: "2.4rem",
                  fontWeight: "700",
                  marginTop: "0.2rem",
                  marginRight: "4rem",
                }}
                onClick={() => navigateTo(isLoggedIn ? "/" : "/login")}
              >
                LOGIN
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
