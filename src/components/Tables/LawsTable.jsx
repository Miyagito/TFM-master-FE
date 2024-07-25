import React, { useState, useCallback } from "react";
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
import ChecklistIcon from "@mui/icons-material/Checklist";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import LawDisplay from "../ScrapedViews/LawDisplay";
import DeleteButtonLaw from "../Buttons/DeleteButtonLaw";
import useLeyes from "../../hooks/useLeyes";
import { useNavigate } from "react-router-dom";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useSetRecoilState } from "recoil";
import { exportToWord } from "../../helpers/exportToWordFile";

const LawsTable = ({ ley, loading, error, showDeleteButton }) => {
  const [printMode, setPrintMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [lawData, setLawData] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
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
      return;
    }
    if (printMode) {
      resetSelections();
    }
    setPrintMode(!printMode);
  };

  const handleExpandChange = (isExpanded, id) => {
    setExpanded(isExpanded);
    if (!isExpanded) {
      setPrintMode(false);
      setLawData(null);
      setSelectedSections([]);
    }
  };

  const handleSelectionChange = useCallback((itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }, []);

  const customTransitionDuration = {
    enter: 300,
    exit: 100,
  };

  function marcarElementosSeleccionados(estructura, elementosSeleccionados) {
    if (!estructura || !estructura.data || !estructura.data.estructura) {
      return null;
    }

    const actualizarConSeleccionados = (
      elemento,
      padreSeleccionado = false
    ) => {
      const estaSeleccionado =
        elementosSeleccionados[elemento.id] ?? padreSeleccionado;
      const nuevoElemento = {
        ...elemento,
        checked: estaSeleccionado,
      };

      if (elemento.children && elemento.children.length > 0) {
        nuevoElemento.children = elemento.children.map((child) =>
          actualizarConSeleccionados(child, estaSeleccionado)
        );
      }

      return nuevoElemento;
    };

    const estructuraActualizada = estructura.data.estructura.map((elemento) =>
      actualizarConSeleccionados(elemento)
    );

    return {
      ...estructura,
      data: { ...estructura.data, estructura: estructuraActualizada },
    };
  }

  function filtrarElementosMarcados(estructura) {
    // Verifica si la estructura está correctamente definida
    if (!estructura || !estructura.data || !estructura.data.estructura) {
      return null;
    }

    let existeElementoMarcado = false; // Flag para detectar si hay elementos marcados

    // Función recursiva para procesar y filtrar los elementos marcados
    const procesarElementos = (elementos) => {
      return elementos.reduce((acumulado, elemento) => {
        // Procesar recursivamente los hijos si existen
        const hijosFiltrados = elemento.children
          ? procesarElementos(elemento.children)
          : [];

        // Verificar si el elemento o alguno de sus hijos está marcado
        if (elemento.checked || hijosFiltrados.length > 0) {
          acumulado.push({ ...elemento, children: hijosFiltrados });
          if (elemento.checked) {
            existeElementoMarcado = true; // Marcar que encontramos al menos un elemento marcado
          }
        }

        return acumulado;
      }, []);
    };

    // Aplicar la función recursiva a la estructura principal
    const estructuraFiltrada = procesarElementos(estructura.data.estructura);

    // Si no se encontró ningún elemento marcado, devolver la estructura original
    if (!existeElementoMarcado) {
      return estructura;
    }

    return {
      ...estructura,
      data: { ...estructura.data, estructura: estructuraFiltrada },
    };
  }
  const handleEditAndPrintMode = () => {
    const markedData = marcarElementosSeleccionados(lawData, selectedItems);
    const filteredData = filtrarElementosMarcados(markedData);
    if (
      markedData &&
      markedData.data &&
      Array.isArray(filteredData.data.estructura)
    ) {
      exportToWord(filteredData.data.estructura, ley);
    } else {
      console.error("Invalid data structure for export");
    }
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
                printMode
                  ? "Cancelar impresión"
                  : "Elegir secciones legales para imprimir."
              }
            >
              <IconButton onClick={(e) => togglePrintMode(e)} color="primary">
                {printMode ? <CancelIcon /> : <ChecklistIcon />}
              </IconButton>
            </Tooltip>
          )}
          {expanded && (
            <Tooltip title={"Acceder al modo de edición e impresión."}>
              <IconButton onClick={handleEditAndPrintMode} color="primary">
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
              ley={marcarElementosSeleccionados(lawData, selectedItems)}
              lawName={ley.nombre}
              isPrintMode={printMode}
              loading={loading}
              onSelectionChange={handleSelectionChange}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default LawsTable;
