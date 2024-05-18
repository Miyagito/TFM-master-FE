import React from "react";
import Header from "../../components/Header/Header";
import LawsTable from "../../components/Tables/LawsTable";
import { useRecoilValue } from "recoil";
import useLeyes from "../../hooks/useLeyes";
import { lawsState } from "../../atoms/leyesAtom";
import { Container, Typography, Divider, Box } from "@mui/material";

const HomePage = () => {
  const { loadLaws, loading, error } = useLeyes();
  const leyes = useRecoilValue(lawsState);
  return (
    <div>
      <Header />
      <Container>
        <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
          Lista de Leyes
        </Typography>
        <Box sx={{ my: 4 }}>
          <Divider variant="middle" />
        </Box>
        <LawsTable leyes={leyes} loading={loading} error={error} />
      </Container>
    </div>
  );
};

export default HomePage;
