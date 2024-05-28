import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import useOposiciones from "../../hooks/useOposiciones";
import OpositionDisplay from "../OpositionView/OpositionDisplay";

const OpositionsTable = () => {
  const { oposiciones, loading, error } = useOposiciones();
  const navigate = useNavigate();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ups... algo salió mal: {error}</div>;

  return (
    <Box sx={{ width: "100%", mt: 3, mb: 3, overflow: "auto", height: "100%" }}>
      {oposiciones.map((oposition) => (
        <Accordion key={oposition.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1a-content-${oposition.id}`}
            id={`panel1a-header-${oposition.id}`}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ flex: 1 }}>{oposition.nombre}</Typography>
            <Tooltip title="Ver detalles">
              <IconButton color="primary">
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Imprimir temario">
              <IconButton color="success">
                <PrintIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar oposición">
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>
            <OpositionDisplay oposition={oposition} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default OpositionsTable;
