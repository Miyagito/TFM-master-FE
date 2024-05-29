import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Header from "../../components/Header/Header";
import OpositionsTable from "../../components/Tables/OpositionsTable";
import { useNavigate, useLocation } from "react-router-dom";

const AdminConsoleOposiciones = () => {
  const location = useLocation();
  const { isAdmin } = location.state || { isAdmin: false };
  const navigate = useNavigate();

  const handleAddOposition = () => {
    navigate("/add-oposition-form");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          mb: 2,
          overflow: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 4,
            mb: 2,
          }}
        >
          <Typography variant="h4" sx={{ mt: 4, mb: 4, mr: 10 }}>
            Administración de Oposiciones
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddOposition}
            sx={{ marginRight: 2 }}
          >
            Agregar Oposición
          </Button>
          <Button variant="outlined" onClick={handleBack}>
            Volver
          </Button>
        </Box>

        <OpositionsTable isAdmin={isAdmin} />
      </Box>
    </Box>
  );
};

export default AdminConsoleOposiciones;
