import React, { useState } from "react";
import axios from "../../api/axios/axiosConfig";
import { TextField, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddLawForm = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    /* await axios.post("/api/laws", { url }); */
    // Aquí podrías actualizar el estado para mostrar la nueva ley en la lista
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <TextField
        label="URL de la Ley"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        sx={{ maxWidth: 500, mr: 2 }}
      />
      <Fab color="primary" aria-label="add" onClick={handleSubmit}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AddLawForm;
