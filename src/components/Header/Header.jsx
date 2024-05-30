import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";
import useAuth from "../../hooks/useAuth";

function Header() {
  const auth = useRecoilValue(authState);
  const { logout, userName } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isAdmin = auth.user?.role === "admin";

  return (
    <AppBar position="static" color={isAdmin ? "primary" : "secondary"}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {isAdmin ? "MiAppTemarios - Administrador" : "MiAppTemarios"}
        </Typography>
        {auth.user && (
          <Box sx={{ textAlign: "center" }}>
            <Button color="inherit" onClick={handleLogout} size="small">
              Logout
            </Button>
            <Typography variant="caption" sx={{ display: "block" }}>
              {userName}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
