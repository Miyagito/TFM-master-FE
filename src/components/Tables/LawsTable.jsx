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
  const [expanded, setExpanded] = useState(false);
  const [lawData, setLawData] = useState(null);
  const { deleteLaw, loadSingleLaw } = useLeyes();
  const navigate = useNavigate();
  const setSelectedSections = useSetRecoilState(selectedSectionsState);

  const getLey = async (id) => {
    const data = await loadSingleLaw(id);
    setLawData(data);
  };

  const resetSelections = () => setSelectedSections([]);

  const togglePrintMode = (e) => {
    e.stopPropagation();
    if (!expanded) {
      // Solo permitir cambiar el modo de impresión si está expandido
      return;
    }
    if (printMode) {
      resetSelections();
    }
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

  const handleExpandChange = (isExpanded, id) => {
    setExpanded(isExpanded);
    if (!isExpanded) {
      setPrintMode(false);
      setLawData(null);
      setSelectedSections([]);
    }
  };

  const customTransitionDuration = {
    enter: 300,
    exit: 100,
  };

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        mt: 3,
        mb: 3,
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Accordion
        TransitionProps={{ timeout: customTransitionDuration }}
        onChange={async (e, expanded) => {
          await getLey(ley.id);
          handleExpandChange(expanded);
        }}
      >
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
          {expanded && (
            <Tooltip
              title={
                printMode ? "Cancelar impresión" : "Preparar para imprimir"
              }
            >
              <IconButton onClick={(e) => togglePrintMode(e)} color="primary">
                {printMode ? <CancelIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
          )}
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
          {lawData && (
            <LawDisplay
              ley={lawData}
              lawName={ley.nombre}
              isPrintMode={printMode}
              loading={loading}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LawsTable;
