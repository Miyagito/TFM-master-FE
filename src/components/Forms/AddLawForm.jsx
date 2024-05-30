import React, { useState } from "react";
import { TextField, Box, Fab, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useLeyes from "../../hooks/useLeyes";
import { useRecoilValue } from "recoil";
import { scrapedLawsState } from "../../atoms/leyesAtom";
import LoadingComponent from "../Loading/Loading";
import LawDisplay from "../ScrapedViews/LawDisplay";
import leyesServicesAPI from "../../api/services/leyes/leyesServicesAPI";
import { useNavigate } from "react-router-dom";

const AddLawForm = () => {
  const [url, setUrl] = useState(""); // Estado para guardar la URL introducida por el usuario
  const scrapedLaws = useRecoilValue(scrapedLawsState);
  const { handleScrapeLaw, loading, loadLaws } = useLeyes();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleScrapedPreview = async () => {
    if (url) {
      try {
        await handleScrapeLaw(url);
      } catch (error) {
        console.error("Error al hacer scraping de la ley:", error);
      }
    } else {
      alert("Por favor, introduzca una URL válida.");
    }
  };

  const handleAddLaw = async () => {
    console.log(scrapedLaws, "scraped");
    if (!scrapedLaws || !scrapedLaws.data) {
      console.error("No hay datos de leyes scrapeados para agregar.");
      return;
    }

    const lawData = {
      nombre: scrapedLaws.data.nombreLey,
      url: url,
      contenido: scrapedLaws.data.estructura,
    };

    try {
      await leyesServicesAPI.addLaw(lawData);
      loadLaws();
      alert("Ley agregada con éxito!");
    } catch (error) {
      console.error("Error al agregar la ley:", error);
      alert("Error al agregar la ley");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 4 }}>
        Buscar leyes
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <TextField
          label="URL de la Ley"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500, mr: 2 }}
        />
        <Fab
          color="primary"
          aria-label="search"
          onClick={handleScrapedPreview}
          disabled={loading}
        >
          <SearchIcon />
        </Fab>
      </Box>
      {loading && <LoadingComponent />}
      {scrapedLaws && (
        <Box
          sx={{
            margin: "20px",
            overflowY: "auto",
            maxHeight: "900px",
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleAddLaw}>
            Agregar Ley
          </Button>
          <LawDisplay
            ley={scrapedLaws}
            nombreLey={scrapedLaws.data.nombreLey}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
            <Button variant="contained" color="primary" onClick={handleAddLaw}>
              Agregar Ley
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleBack}
              sx={{ ml: 2 }}
            >
              Volver
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddLawForm;
