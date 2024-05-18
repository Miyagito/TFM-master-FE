import React, { useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LawDisplay from "../ScrapedViews/LawDisplay";

const LawsTable = ({ ley, loading, error }) => {
  const customTransitionDuration = {
    exit: 100,
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
      <Accordion
        key={ley.id}
        TransitionProps={{ timeout: customTransitionDuration }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`panel1a-header-${ley.id}`}
        >
          <Typography>{ley.nombre}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <LawDisplay ley={ley.contenido} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LawsTable;
