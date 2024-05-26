import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import LawDisplay from "../ScrapedViews/LawDisplay";
import DeleteButtonLaw from "../Buttons/DeleteButtonLaw";
import useLeyes from "../../hooks/useLeyes";
import { useNavigate } from "react-router-dom";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useSetRecoilState } from "recoil";

const LawsTable = ({ ley, loading, error, showDeleteButton }) => {
  const [printMode, setPrintMode] = useState(false);
  const { deleteLaw } = useLeyes();
  const navigate = useNavigate();
  const setSelectedSections = useSetRecoilState(selectedSectionsState);

  const resetSelections = () => setSelectedSections([]);

  const togglePrintMode = () => {
    if (printMode) resetSelections();
    setPrintMode(!printMode);
  };

  const goToPrintView = () => {
    if (printMode) navigate("/print-view");
  };

  const goToPrintAllLaw = () => {
    if (!printMode) {
      navigate("/print-all-law-view", { state: { ley: ley.contenido } });
    }
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
          <Tooltip
            title={printMode ? "Cancelar impresión" : "Preparar para imprimir"}
          >
            <IconButton onClick={togglePrintMode} color="primary">
              {printMode ? <CancelIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
          {printMode && (
            <Tooltip title="Imprimir vista personalizada de la ley">
              <IconButton onClick={goToPrintView} color="success">
                <PrintIcon />
              </IconButton>
            </Tooltip>
          )}
          {!printMode && (
            <Tooltip title="Imprimir toda la ley">
              <IconButton
                onClick={() => goToPrintAllLaw(ley)}
                color="secondary"
              >
                <PrintIcon />
              </IconButton>
            </Tooltip>
          )}
          {showDeleteButton && (
            <DeleteButtonLaw
              lawId={ley.id}
              serviceCallBack={deleteLaw}
              loading={loading}
              error={error}
            >
              <Tooltip title="Eliminar ley">
                <DeleteIcon />
              </Tooltip>
            </DeleteButtonLaw>
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
