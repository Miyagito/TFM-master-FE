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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import useOposiciones from "../../hooks/useOposiciones";
import OpositionDisplay from "../OpositionView/OpositionDisplay";

const OpositionsTable = () => {
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

  const handleDeleteClick = (id) => {
    setOpenDialog(true);
    setDeleteId(id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
    await loadOposiciones(); // Ensure list is updated
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ups... algo salió mal: {error}</div>;

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
              <IconButton
                color="error"
                onClick={() => handleDeleteClick(oposition.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
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
