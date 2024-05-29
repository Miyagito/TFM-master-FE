import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import useOposiciones from "../../hooks/useOposiciones";
import OpositionDisplay from "../OpositionView/OpositionDisplay";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const OpositionsTable = ({ isAdmin }) => {
  const navigate = useNavigate();
  const {
    handleDeleteOposicion,
    oposiciones,
    loading,
    error,
    response,
    loadOposiciones,
  } = useOposiciones();
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handlePrint = (oposition) => {
    navigate("/print-Oposition", {
      state: { oposition: oposition },
    });
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setOpenDialog(true);
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleEditOposition = (e, oposition) => {
    e.stopPropagation();
    navigate("/add-oposition-form", {
      state: { oposition: oposition, title: "Editar Oposición" },
    });
  };

  const confirmDelete = async () => {
    await handleDeleteOposicion(deleteId);
    if (response && response.status === 200) {
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Error al eliminar la oposición",
        severity: "error",
      });
    }
    setOpenDialog(false);
    await loadOposiciones();
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ups... algo salió mal: {error}</div>;
  if (oposiciones.length < 1)
    return <div>No hay Oposiciones para mostrar...</div>;

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mt: 3,
        mb: 3,
        overflow: "visible",
        height: "100%",
      }}
    >
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
            {isAdmin && (
              <Tooltip title="Editar Oposición">
                <IconButton
                  color="primary"
                  onClick={(e) => handleEditOposition(e, oposition)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Imprimir temario">
              <IconButton onClick={() => handlePrint(oposition)}>
                <PrintIcon />
              </IconButton>
            </Tooltip>
            {isAdmin && (
              <Tooltip title="Eliminar oposición">
                <IconButton
                  color="error"
                  onClick={(e) => handleDeleteClick(e, oposition.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <OpositionDisplay oposition={oposition} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>¿Eliminar la oposición seleccionada?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro de que quieres
            continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={confirmDelete} autoFocus color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OpositionsTable;
