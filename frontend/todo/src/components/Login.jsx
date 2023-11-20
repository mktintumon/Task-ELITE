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
import ReCAPTCHA from "react-google-recaptcha";

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const [submit , setSubmit] = useState(false);

  const navigateTo = useNavigate();

  function onChange() {
    setVerify(true);
  }

  useEffect(()=>{
    if(email.length && password.length && verify){
      setSubmit(true);
    }
  },[email , password , verify])

  async function save(event) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8081/login/${email}/${password}`
      );

      console.log(response);

      if (response.data !== "") {
        const userData = response.data.userName;
        localStorage.setItem("userData", JSON.stringify(userData));

        setEmail("");
        setPassword("");
        navigateTo("/todo");
        window.location.reload();
      } else {
        alert("Incorrect Email / password");
      }
    } catch (error) {
      alert("Incorrect Email / password");
    }
  }

  return (
    <div
      style={{
        padding: "4rem",
        border: "2px solid #455d7a",
        borderRadius: "2rem",
        width: "30rem",
        height: "30rem",
        margin: "auto",
        marginTop: "7rem",
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
      

              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                type="image"
                onChange={onChange}
              />

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
                    style={{ marginLeft: "1.5rem", fontSize: "1rem" }}
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
