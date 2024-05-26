import React, { forwardRef, useEffect } from "react";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { normalizeLawData } from "../../helpers/nomalizeData";
import { useNavigate, useLocation } from "react-router-dom";
import "./print.css";

const PrintAllLawView = forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Accede a la ley desde el estado del enrutador o redirige si no está disponible
  const ley = location.state ? location.state.ley : null;

  useEffect(() => {
    if (!ley) {
      // Si no hay ley disponible, redirige o muestra un mensaje
      console.log("No hay ley proporcionada, redirigiendo...");
      navigate("/"); // Ajusta la ruta según sea necesario
    }
  }, [ley, navigate]);

  if (!ley) return <div>No hay leyes para mostrar</div>;

  // Normaliza los datos de la ley
  const normalizedLawData = normalizeLawData(ley);

  const handleBack = () => navigate(-1);
  const handlePrint = () => window.print();

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
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%", mb: 4 }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{ mx: 2 }}
          className="no-print"
        >
          Volver
        </Button>
        <Button variant="contained" onClick={handlePrint} className="no-print">
          Imprimir
        </Button>
      </Box>

      {normalizedLawData.map((item, index) => (
        <Card
          ref={ref}
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

export default PrintAllLawView;
