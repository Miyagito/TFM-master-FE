import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LawDisplay from "../ScrapedViews/LawDisplay";
import DeleteButtonLaw from "../Buttons/DeleteButtonLaw";
import useLeyes from "../../hooks/useLeyes";
import { useNavigate } from "react-router-dom";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useRecoilState, useSetRecoilState } from "recoil";

const LawsTable = ({ ley, loading, error, showDeleteButton }) => {
  const [printMode, setPrintMode] = useState(false);
  const { deleteLaw } = useLeyes();
  const navigate = useNavigate();
  const setSelectedSections = useSetRecoilState(selectedSectionsState);

  const resetSelections = () => setSelectedSections([]);

  const togglePrintMode = () =>
    printMode ? resetSelections() : setPrintMode(!printMode);

  const goToPrintView = () => printMode && navigate("/print-view");

  const goToPrintAllLaw = () => {
    navigate("/print-all-law-view", { state: { ley: ley.contenido } });
  };

  const customTransitionDuration = {
    enter: 300,
    exit: 100,
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
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
          <Button onClick={togglePrintMode}>
            {printMode ? "Cancel Print" : "Prepare for Print"}
          </Button>
          {printMode && (
            <Button onClick={goToPrintView} sx={{ ml: 1 }}>
              Print Customized Law View
            </Button>
          )}
          <Button onClick={() => goToPrintAllLaw(ley)} sx={{ ml: 1 }}>
            Print All Law
          </Button>
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
          <LawDisplay ley={ley.contenido} isPrintMode={printMode} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LawsTable;
