import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
      <Box textAlign="center">
        <CircularProgress />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Cargando...
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingComponent;
