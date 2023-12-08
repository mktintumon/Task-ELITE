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
import { useEffect, useState } from "react";
import axios from "axios";
import RotateRightIcon from "@mui/icons-material/RotateRight";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [url, setUrl] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [random, setRandom] = useState(0);

  const navigateTo = useNavigate();

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    if (email.length && password.length && captcha.length) {
      setSubmit(true);
    }
  }, [email, password, captcha]);

  useEffect(() => {
    const randNum = randomNumberInRange(1, 5000);
    setRandom(randNum);
    console.log(randNum);
    const getImage = async () => {
      const response = await axios.get(
        `http://localhost:8081/captcha/${randNum}`
      );
      const imageUrl = response.data.imageUrl;
      setUrl(imageUrl);
    };

    getImage();
    randomNumberInRange(1, 5000);
  }, [refresh]);


  async function save(event) {
    event.preventDefault();
    try {
      console.log(random);
      const response = await axios.post(`http://localhost:8081/login/${random}`, {
        email,
        password,
        captcha,
      });

      console.log(response);

      if (response.data.userId !== null) {
        const username = response.data.userName;
        const userId = response.data.userId;
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("userId", JSON.stringify(userId));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));

        setEmail("");
        setPassword("");
        alert("Login successful😊");
        navigateTo("/todo", { state: { userId: response.data.userId } });
        window.location.reload();
      } else {
        alert("wrong captcha");
      }
    } catch (error) {
      alert("Incorrect Email / password");
    }
  }

  return (
    <div
      style={{
        paddingTop: "3.6rem",
        width: "30rem",
        height: "30rem",
        margin: "auto",
        marginTop: "5rem",
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
            <Typography
              component="h1"
              variant="h4"
              mx="5"
              style={{ marginBottom: "1rem" }}
            >
              Login
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <TextField
                  required
                  margin="normal"
                  fullWidth
                  name="captcha"
                  label="Enter captcha"
                  type="text"
                  id="captcha"
                  onChange={(e) => {
                    setCaptcha(e.target.value);
                  }}
                />
                <img
                  src={`data:image/png;base64,${url}`}
                  alt="captcha"
                  height="50rem"
                  width="150rem"
                  style={{ borderRadius: "1rem", marginTop: "0.6rem" }}
                />
                <RotateRightIcon
                  onClick={() => setRefresh(!refresh)}
                  style={{ marginTop: "0.6rem", fontSize: "2.5rem" }}
                />
              </div>

              <Button
                onClick={save}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                disabled={!submit}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    href="/signup"
                    variant="body2"
                    style={{ marginLeft: "3.5rem", fontSize: "1rem" }}
                  >
                    {"Don't have an account? REGISTER"}
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
