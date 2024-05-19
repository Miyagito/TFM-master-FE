import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { normalizeLawData } from "../../helpers/nomalizeData";

const LawDisplay = ({ ley }) => {
  if (!ley) return <div>No hay leyes para mostrar</div>;

  const normalizedLawData = normalizeLawData(ley);

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
            {item.children.length > 0 &&
              item.children.map((content, idx) => (
                <Typography key={idx} style={{ textAlign: "justify" }}>
                  {content.contenido}
                </Typography>
              ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LawDisplay;
