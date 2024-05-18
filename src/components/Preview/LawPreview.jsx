import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LawPreview = ({ lawData, onConfirm, onCancel }) => {
  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Previsualización de la Ley
      </Typography>
      {lawData.map((section, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {section.content}
              {section.articles.map((article, idx) => (
                <Typography key={idx} paragraph>
                  Artículo {idx + 1}: {article}
                </Typography>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirmar
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default LawPreview;
