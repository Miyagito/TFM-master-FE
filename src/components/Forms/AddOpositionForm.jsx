import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Alert,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useOposiciones from "../../hooks/useOposiciones";

const AddOpositionForm = () => {
  const [inputError, setInputError] = useState("");
  const [opositionData, setOpositionData] = useState({
    nombre: "",
    url_publicacion: "",
    fecha_publicacion: "",
    temario: "",
    fecha_inicio_instancias: "",
    fecha_fin_instancias: "",
    url_instancias: "",
    numero_plazas: "",
  });
  const navigate = useNavigate();
  const { error, loading, handleAddOposicion } = useOposiciones();
  const handleChange = (e) => {
    setOpositionData({ ...opositionData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleTemarioChange = (value) => {
    setOpositionData({ ...opositionData, temario: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !opositionData.nombre ||
      !opositionData.url_publicacion ||
      !opositionData.fecha_publicacion ||
      !opositionData.temario ||
      !opositionData.fecha_inicio_instancias ||
      !opositionData.fecha_fin_instancias ||
      !opositionData.url_instancias ||
      opositionData.numero_plazas === ""
    ) {
      setInputError("Please fill all fields before submitting.");
      return;
    }

    try {
      await handleAddOposicion(opositionData);
      navigate("/");
    } catch (err) {
      console.error("Failed to add oposicion:", err);
    }
  };

  const modules = {
    toolbar: [
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],

      ["clean"],
    ],
  };

  if (loading) <div>loading ...</div>;
  if (error) <div>Ups... algo salio mal</div>;

  return (
    <Container maxWidth="md" overflowY="auto" height="100vh">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ my: 4, textAlign: "center" }}
        >
          Añadir Nueva Oposición
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBack}
          sx={{ ml: 2 }}
        >
          Volver
        </Button>
      </Box>
      {inputError && <Alert severity="error">{inputError}</Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="nombre"
              label="Nombre de la Oposición"
              name="nombre"
              value={opositionData.nombre}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="url_publicacion"
              label="URL de Publicación"
              name="url_publicacion"
              value={opositionData.url_publicacion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fecha_publicacion"
              label="Fecha de Publicación"
              name="fecha_publicacion"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={opositionData.fecha_publicacion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Temario
            </Typography>
            <ReactQuill
              theme="snow"
              value={opositionData.temario}
              onChange={handleTemarioChange}
              modules={modules}
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fecha_inicio_instancias"
              label="Fecha Inicio de Instancias"
              name="fecha_inicio_instancias"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={opositionData.fecha_inicio_instancias}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="fecha_fin_instancias"
              label="Fecha Fin de Instancias"
              name="fecha_fin_instancias"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={opositionData.fecha_fin_instancias}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="url_instancias"
              label="URL de Instancias"
              name="url_instancias"
              value={opositionData.url_instancias}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="numero_plazas"
              label="Número de Plazas"
              name="numero_plazas"
              type="number"
              value={opositionData.numero_plazas}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" sx={{ py: 2 }}>
              Añadir Oposición
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddOpositionForm;
