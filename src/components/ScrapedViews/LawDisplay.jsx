import React, { forwardRef } from "react";
import { Typography, Card, CardContent, Box, Checkbox } from "@mui/material";
import { normalizeLawData } from "../../helpers/nomalizeData";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useRecoilState } from "recoil";

const LawDisplay = forwardRef(({ ley, isPrintMode, nombreLey }, ref) => {
  // Estado para mantener las secciones seleccionadas
  const [selectedSections, setSelectedSections] = useRecoilState(
    selectedSectionsState
  );

  // Normaliza los datos de la ley
  const normalizedLawData = normalizeLawData(ley);

  // Maneja el cambio de selección
  const handleSelectionChange = (section) => {
    const sectionIndex = selectedSections.findIndex(
      (s) => s.index === section.index
    );
    let newSelections;
    if (sectionIndex > -1) {
      // Si ya está seleccionada, elimínala
      newSelections = selectedSections.filter((s) => s.index !== section.index);
    } else {
      // Si no está seleccionada, agrégala incluyendo todo el contenido anidado
      newSelections = [...selectedSections, section];
    }
    setSelectedSections(newSelections);
  };

  if (!ley) return <div>No hay leyes para mostrar</div>;
  return (
    <Box
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgb(250, 250, 250)",
      }}
    >
      {nombreLey && (
        <Typography
          variant="h5"
          style={{
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          {nombreLey}
        </Typography>
      )}
      {normalizedLawData.map((item, index) => (
        <Card
          key={index}
          style={{
            marginBottom: "10px",
            width: "100%",
            boxShadow: "none",
            border: "none",
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <CardContent>
            {isPrintMode && (
              <Checkbox
                checked={selectedSections.some((s) => s.index === index)}
                onChange={() => handleSelectionChange({ ...item, index })}
              />
            )}
            <Typography
              variant="h5"
              component="h2"
              style={{
                textAlign:
                  item.tipo === "titulo" ||
                  item.tipo === "titulo_num" ||
                  item.tipo === "titulo_tit" ||
                  item.tipo === "capitulo_num" ||
                  item.tipo === "capitulo_tit"
                    ? "center"
                    : "left",
              }}
            >
              {item.contenido}
            </Typography>
            {item.children &&
              item.children.map((content, idx) => (
                <Typography key={idx} sx={{ textAlign: "justify" }}>
                  {content.contenido}
                </Typography>
              ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
});

export default LawDisplay;
