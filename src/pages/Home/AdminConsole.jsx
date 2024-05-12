import React from "react";
import AddLawForm from "../../components/Forms/AddLawForm";
import LawsTable from "../../components/Tables/LawsTable";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../../components/Header/Header";

const AdminConsole = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant="h4" sx={{ mt: 4, mb: 4 }}>
          Administración de Leyes
        </Typography>
        <AddLawForm />
        <Box sx={{ my: 4 }}>
          <Divider variant="middle" />
        </Box>
        <LawsTable />
      </Container>
    </>
  );
};

export default AdminConsole;
