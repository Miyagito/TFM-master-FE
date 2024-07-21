import React, { useEffect } from "react";
import AddLawForm from "../../components/Forms/AddLawForm";
import LawsTable from "../../components/Tables/LawsTable";
import { Container, Typography, Divider, Box, Button } from "@mui/material";
import Header from "../../components/Header/Header";
import useLeyes from "../../hooks/useLeyes";
import { useRecoilValue } from "recoil";
import { lawsState } from "../../atoms/leyesAtom";
import { useNavigate } from "react-router-dom";

const AdminConsole = () => {
  const { loadLaws, loading, error } = useLeyes();
  const leyes = useRecoilValue(lawsState);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    loadLaws();
  }, [loadLaws]);

  return (
    <Box
      sx={{
        overflowY: "auto",
      }}
    >
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Typography variant="h4" sx={{ mr: 5 }}>
            Administración de Leyes
          </Typography>
          <Button variant="outlined" onClick={handleBack}>
            Volver
          </Button>
        </Box>
        <Divider sx={{ mb: 5, mt: 5 }} />
        <AddLawForm />
        <Box sx={{ my: 4 }}>
          <Divider sx={{ mb: 5, mt: 5 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Lista de leyes
          </Typography>
        </Box>
        {loading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {leyes.length > 0 ? (
          leyes.map((ley) => (
            <LawsTable
              showDeleteButton={true}
              ley={ley}
              loading={loading}
              error={error}
              key={ley.id}
            />
          ))
        ) : (
          <Typography variant="body1">No hay leyes disponibles</Typography>
        )}
      </Container>
    </Box>
  );
};

export default AdminConsole;
