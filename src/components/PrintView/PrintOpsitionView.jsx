import React, { useEffect, useState } from "react";
import { Typography, Grid, Link, IconButton, Box, Button } from "@mui/material";
import ReactQuill from "react-quill";
import PublicIcon from "@mui/icons-material/Public";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import { grey } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import "./print.css";

const PrintOpositionView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [printed, setPrinted] = useState(false);
  const { oposition } = location.state || {};

  const handlePrint = () => {
    window.print();
    window.onafterprint = () => navigate(-1);
  };

  const handleCancel = () => navigate(-1);

  if (!oposition) return <p>Loading oposition details...</p>;

  return (
    <div
      style={{
        p: 2,
        flexGrow: 1,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "flex-end",

          right: 0,
          top: 0,
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          style={{ marginRight: "10px" }}
        >
          Imprimir
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancelar
        </Button>
      </div>
      <div>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {oposition.nombre}
        </Typography>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="URL de publicación">
                <PublicIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                URL de publicación:
              </Typography>
            </Box>
            <Link
              href={oposition.url_publicacion}
              target="_blank"
              rel="noopener"
              sx={{ ml: 4 }}
            >
              {oposition.url_publicacion}
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="Fecha de publicación">
                <EventIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                Fecha de publicación:
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {new Date(oposition.fecha_publicacion).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="Número de plazas">
                <PeopleIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                Número de plazas:
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {oposition.numero_plazas}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="Fecha inicio de instancias">
                <EventIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                Fecha inicio de instancias:
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {new Date(oposition.fecha_inicio_instancias).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="Fecha fin de instancias">
                <EventIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                Fecha fin de instancias:
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4 }}>
              {new Date(oposition.fecha_fin_instancias).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton aria-label="URL de instancias">
                <PublicIcon />
              </IconButton>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{ ml: 1 }}
              >
                URL de instancias:
              </Typography>
            </Box>
            <Link
              href={oposition.url_instancias}
              target="_blank"
              rel="noopener"
              sx={{ ml: 4 }}
            >
              {oposition.url_instancias}
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, p: 2, bgcolor: grey[50] }}>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Temario
          </Typography>
          <ReactQuill
            value={oposition.temario}
            readOnly={true}
            theme="bubble"
            modules={{ toolbar: false }}
            style={{ height: "200px" }}
          />
        </Box>
      </div>
    </div>
  );
};

export default PrintOpositionView;
