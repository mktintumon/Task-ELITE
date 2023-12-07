import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const defaultTheme = createTheme();

export default function Signup({isLoggedIn, setIsLoggedIn}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (name.length && email.length && password.length) {
      setSubmit(true);
    }
  }, [name, email, password]);

  async function save(event) {
    event.preventDefault();

    try {
      const response = await axios.post(`http://localhost:8081/register`, {
        userName: name,
        email: email,
        password: password,
      });

      if (response.data !== null) {
        alert("Registration Successful😊👌");
        setName("");
        setEmail("");
        setPassword("");
        navigateTo("/login", { state: { email: email } });
      } else {
        alert("wrong captcha");
      }
    } catch (err) {
      alert("User Registation Failed😢");
    }
  }

  const handleGoogleLogin = ()=>{
    window.location.href = "http://localhost:8081/oauth2/authorization/google";
  }

  return (
    <div
      style={{
        paddingTop: "3.5rem",
        width: "38rem",
        height: "33rem",
        margin: "auto",
        marginTop: "4rem",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: "-2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Register
            </Typography>
            <button
              className="button"
              onClick={handleGoogleLogin}
            >
              <img
                src="icons/google.svg"
                alt="google login"
                className="icon"
              ></img>
              <span className="buttonText">Sign in with Google</span>
            </button>

            <Box
              component="form"
              onSubmit={save}
              noValidate
              sx={{ mt: 0 }}
              style={{ height: "20px" }}
            >
              <TextField
                required
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                type="text"
                name="username"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                autoFocus
              />
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!submit}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{ marginLeft: "5rem", fontSize: "1rem" }}
                  >
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
