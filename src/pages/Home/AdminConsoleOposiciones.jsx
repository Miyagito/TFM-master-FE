import React from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import OpositionsTable from "../../components/Tables/OpositionsTable";

const AdminConsoleOposiciones = () => {
  return (
    <Box>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 4,
          mb: 2,
          overflow: "auto",
          height: "100%",
        }}
      >
        <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
          Administración de Oposiciones
        </Typography>
        <OpositionsTable />
      </Box>
    </Box>
  );
};

export default AdminConsoleOposiciones;
