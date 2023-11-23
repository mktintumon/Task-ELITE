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
import RotateRightIcon from "@mui/icons-material/RotateRight";

const defaultTheme = createTheme();

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [random, setRandom] = useState(0);
  const [url, setUrl] = useState("");

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (name.length && email.length && password.length && captcha.length) {
      setSubmit(true);
    }
  }, [name, email, password, captcha]);

  useEffect(() => {
    const randNum = randomNumberInRange(1,5000);
    setRandom(randNum);
    console.log(randNum);
    const getImage = async () => {
      const response = await axios.get(`http://localhost:8081/captcha/${randNum}`);
      const imageUrl = response.data.imageUrl;
      setUrl(imageUrl);
    };

    getImage();
    randomNumberInRange(1,5000)
  }, [refresh]);

  async function save(event) {
    event.preventDefault();
    
    try {
      console.log(random);
      const response = await axios.post(`http://localhost:8081/register/${random}`, {
        userName: name,
        email: email,
        password: password,
        captcha: captcha,
      });

      if (response.data === "success") {
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

  return (
    <div
      style={{
        paddingTop: "3.5rem",
        border: "2px solid #455d7a",
        borderRadius: "2rem",
        width: "38rem",
        height: "33rem",
        margin: "auto",
        marginTop: "6rem",
        boxShadow: "5px 5px 5px 5px  gray",
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {/* <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                type="image"
                onChange={onChange}
                style={{marginLeft:"3rem"}}
                disabled
              /> */}

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
