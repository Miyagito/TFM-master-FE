import React, { forwardRef } from "react";
import { Typography, Card, CardContent, Box, Checkbox } from "@mui/material";
import { normalizeLawData } from "../../helpers/nomalizeData";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useRecoilState } from "recoil";

const renderItems = (items) => {
  return items.map((item, index) => {
    const content =
      typeof item.texto === "string"
        ? item.texto
        : typeof item.contenido === "string"
        ? item.contenido
        : "Contenido no disponible";

    return (
      <Card
        key={index}
        sx={{
          marginBottom: "10px",
          width: "100%",
          boxShadow: "none",
          border: "none",
          backgroundColor: "rgb(250, 250, 250)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              textAlign: [
                "titulo",
                "titulo_num",
                "titulo_tit",
                "capitulo_num",
                "capitulo_tit",
                "titulo_preambulo",
                "centro_redonda",
              ].includes(item.tipo)
                ? "center"
                : "justify",
              fontSize: ["titulo_preambulo"].includes(item.tipo)
                ? "1.5rem"
                : "1.1rem",
              color: item.tipo === "titulo_preambulo" ? "#123a63" : "#000000",
              fontWeight: ["articulo", "titulo_tit", "capitulo_tit"].includes(
                item.tipo
              )
                ? "bold"
                : "normal",
            }}
          >
            {content}
          </Typography>
          {item.children && renderItems(item.children)}
        </CardContent>
      </Card>
    );
  });
};

const LawDisplay = forwardRef(({ ley, isPrintMode, lawName, loading }, ref) => {
  /* console.log(normalizeLawData(ley), "NORMALIZED"); */
  // Estado para mantener las secciones seleccionadas
  /* const [selectedSections, setSelectedSections] = useRecoilState(
    selectedSectionsState
  ); */

  // Normaliza los datos de la ley
  /* const normalizedLawData = normalizeLawData(ley); */

  // Maneja el cambio de selección
  /*   const handleSelectionChange = (section) => {
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
  }; */
  if (loading) return <Typography>Cargando...</Typography>;
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
      {ley && (
        <Typography
          variant="h5"
          style={{
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          {lawName}
        </Typography>
      )}
      {/* {normalizedLawData.map((item, index) => ( */}
      <Card
        /* key={index} */
        style={{
          marginBottom: "10px",
          width: "100%",
          boxShadow: "none",
          border: "none",
          backgroundColor: "rgb(250, 250, 250)",
        }}
      >
        <CardContent>
          {isPrintMode &&
            {
              /* <Checkbox
              checked={selectedSections.some((s) => s.index === index)}
              onChange={() => handleSelectionChange({ ...ley, index })}
            /> */
            }}
          {renderItems(ley.data.estructura)}
        </CardContent>
      </Card>
      {/*     ))} */}
    </Box>
  );
});

export default LawDisplay;
