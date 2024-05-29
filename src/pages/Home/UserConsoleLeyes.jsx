import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import LawsTable from "../../components/Tables/LawsTable";
import { useRecoilValue } from "recoil";
import useLeyes from "../../hooks/useLeyes";
import { lawsState } from "../../atoms/leyesAtom";
import { Container, Typography, Divider, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserConsoleLeyes = () => {
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
    <Box sx={{ height: "100%", overflowY: "auto" }}>
      <Header />
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 4,
            mb: 2,
          }}
        >
          <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
            Lista de Leyes
          </Typography>

          <Button variant="outlined" onClick={handleBack}>
            Volver
          </Button>
        </Box>
        <Box sx={{ my: 4 }}>
          <Divider variant="middle" />
        </Box>
        {loading && <Typography>Cargando...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}
        {leyes.length > 0 ? (
          leyes.map((ley) => (
            <LawsTable
              showDeleteButton={false}
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

export default UserConsoleLeyes;
