import React, { useEffect } from "react";
import AddLawForm from "../../components/Forms/AddLawForm";
import LawsTable from "../../components/Tables/LawsTable";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../../components/Header/Header";
import useLeyes from "../../hooks/useLeyes";
import { useRecoilValue } from "recoil";
import { lawsState } from "../../atoms/leyesAtom";

const AdminConsole = () => {
  const { loadLaws, loading, error } = useLeyes();
  const leyes = useRecoilValue(lawsState);

  useEffect(() => {
    loadLaws();
  }, [loadLaws]);

  return (
    <Box
      sx={{
        height: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Header />
      <Container>
        <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
          Administración de Leyes
        </Typography>
        <AddLawForm />
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Lista de leyes
          </Typography>
          <Divider variant="middle" sx={{ mt: 2 }} />
        </Box>
        {loading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {leyes.length > 0 ? (
          leyes.map((ley) => (
            <LawsTable ley={ley} loading={loading} error={error} key={ley.id} />
          ))
        ) : (
          <Typography variant="body1">No hay leyes disponibles</Typography>
        )}
      </Container>
    </Box>
  );
};

export default AdminConsole;
