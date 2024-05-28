import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/authAtom";

const HomePage = () => {
  const auth = useRecoilValue(authState);
  const navigate = useNavigate();

  const handleNavigateToLeyes = () => {
    if (auth.user) {
      if (auth.user.role === "admin") {
        navigate("/admin-console-leyes");
      } else {
        navigate("/user-console-leyes");
      }
    }
  };

  const handleNavigateToOpostionForm = () => {
    navigate("/admin-console-oposition");
  };

  return (
    <Box sx={{ overflow: "visible", height: "100%" }}>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={handleNavigateToLeyes}
              sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
            >
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  Leyes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              onClick={handleNavigateToOpostionForm}
              sx={{
                bgcolor: "secondary.main",
                color: "secondary.contrastText",
              }}
            >
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  Oposiciones
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
