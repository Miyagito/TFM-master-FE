import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "../../api/axios/axiosConfig";
import AddLawForm from "../Forms/AddLawForm";

const LawsTable = () => {
  const [laws, setLaws] = useState([]);
  const [editLaw, setEditLaw] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLaws = async () => {
      /* const result = await axios.get("/api/laws");
      setLaws(result.data); */
    };
    fetchLaws();
  }, []);

  const handleDelete = async (lawId) => {
    await axios.delete(`/api/laws/${lawId}`);
    setLaws(laws.filter((law) => law.id !== lawId));
  };

  const handleEdit = (law) => {
    setEditLaw(law);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    /*   const response = await axios.put(`/api/laws/${editLaw.id}`, editLaw);
    if (response.status === 200) {
      const updatedLaws = laws.map((law) => {
        if (law.id === editLaw.id) {
          return editLaw;
        }
        return law;
      });
      setLaws(updatedLaws);
    }
    setOpen(false); */
  };

  const handleChange = (event) => {
    setEditLaw({ ...editLaw, title: event.target.value });
  };

  return (
    <Container>
      <TableContainer component={Paper} elevation={3} sx={{ my: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laws &&
              laws.map((law) => (
                <TableRow key={law.id}>
                  <TableCell>{law.title}</TableCell>
                  <TableCell align="right">
                    <Button color="primary" onClick={() => handleEdit(law)}>
                      Editar
                    </Button>
                    <Button color="error" onClick={() => handleDelete(law.id)}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Ley</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Título de la Ley"
            type="text"
            fullWidth
            variant="outlined"
            value={editLaw?.title || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LawsTable;
