import React, { forwardRef } from "react";
import { Typography, Card, CardContent, Box, Checkbox } from "@mui/material";

const renderItems = (items, printMode, handleSelectionChange) => {
  return items.map((item, index) => {
    const isMainElement = [
      "centro_redonda",
      "titulo_preambulo",
      "titulo",
      "titulo_num",
      "capitulo_num",
      "articulo",
    ].includes(item.tipo);

    const content =
      typeof item.texto === "string"
        ? item.texto
        : typeof item.contenido === "string"
        ? item.contenido
        : "Contenido no disponible";

    const cardBackground =
      printMode && isMainElement ? "#f5f5f5" : "rgb(250, 250, 250)";

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
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: cardBackground,
          }}
        >
          {printMode && isMainElement && (
            <Checkbox
              checked={item.checked}
              onChange={() => handleSelectionChange(item.id)}
              sx={{ marginRight: "10px" }}
            />
          )}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
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
        </CardContent>
        {item.children &&
          renderItems(item.children, printMode, handleSelectionChange)}
      </Card>
    );
  });
};

const LawDisplay = forwardRef(
  ({ ley, isPrintMode, lawName, loading, onSelectionChange }, ref) => {
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
        <Card
          style={{
            marginBottom: "10px",
            width: "100%",
            boxShadow: "none",
            border: "none",
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <CardContent>
            {renderItems(ley.data.estructura, isPrintMode, onSelectionChange)}
          </CardContent>
        </Card>
      </Box>
    );
  }
);

export default LawDisplay;
