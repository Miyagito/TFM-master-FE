import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LawDisplay from "../ScrapedViews/LawDisplay";
import DeleteButtonLaw from "../Buttons/DeleteButtonLaw";
import useLeyes from "../../hooks/useLeyes";

const LawsTable = ({ ley, loading, error, showDeleteButton }) => {
  const { deleteLaw } = useLeyes();
  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  const customTransitionDuration = {
    exit: 100,
  };

  return (
    <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
      <Accordion TransitionProps={{ timeout: customTransitionDuration }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel1a-content-${ley.id}`}
          id={`panel1a-header-${ley.id}`}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ flex: 1 }}>{ley.nombre}</Typography>
          {showDeleteButton && (
            <DeleteButtonLaw
              lawId={ley.id}
              serviceCallBack={deleteLaw}
              loading={loading}
              error={error}
            />
          )}
        </AccordionSummary>
        <AccordionDetails>
          <LawDisplay ley={ley.contenido} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LawsTable;
