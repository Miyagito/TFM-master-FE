import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ErrorComponent = ({ error, retryFunction }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
    >
      <Typography variant="subtitle1" color="error" sx={{ mb: 2 }}>
        {error || "Ha ocurrido un error"}
      </Typography>
      {retryFunction && (
        <Button variant="contained" color="primary" onClick={retryFunction}>
          Reintentar
        </Button>
      )}
    </Box>
  );
};

export default ErrorComponent;
