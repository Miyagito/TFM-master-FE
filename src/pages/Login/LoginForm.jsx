import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasAttemptedLogin, setHasAttemptedLogin] = useState(false);
  const navigate = useNavigate();
  const { user, login, error } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setHasAttemptedLogin(true);
    await login(username, password);
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <>
      <Box display="flex" flexDirection="column" height="100vh">
        <Header />
        <Container
          component="main"
          maxWidth="xs"
          className="login-container"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Paper elevation={6} sx={{ p: 4, marginTop: 8 }}>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Iniciar sesión
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nombre de Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              {/*  {error && hasAttemptedLogin && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )} */}
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default LoginForm;
