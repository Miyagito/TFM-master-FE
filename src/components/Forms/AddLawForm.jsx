import React, { useState } from "react";
import { TextField, Box, Fab, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useLeyes from "../../hooks/useLeyes";
import { useRecoilState } from "recoil";
import { scrapedLawsState } from "../../atoms/leyesAtom";
import LoadingComponent from "../Loading/Loading";
import LawDisplay from "../ScrapedViews/LawDisplay";
import leyesServicesAPI from "../../api/services/leyes/leyesServicesAPI";

const AddLawForm = () => {
  const [url, setUrl] = useState("");
  const [scrapedLaws, setScrapedLaws] = useRecoilState(scrapedLawsState);
  const { handleScrapeLaw, loading, loadLaws } = useLeyes();

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
    if (!scrapedLaws || !scrapedLaws.data) {
      console.error("No hay datos de leyes scrapeados para agregar.");
      return;
    }

    const lawData = {
      nombre: scrapedLaws.data.nombreLey,
      url: url,
      contenido: scrapedLaws.data.estructura,
      metadatos: scrapedLaws.data.metadatos,
    };

    try {
      await leyesServicesAPI.addLaw(lawData);
      alert("Ley agregada con éxito!");
      setUrl("");
      setScrapedLaws(null);
      loadLaws();
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
            backgroundColor: "rgb(250, 250, 250)",
            height: "45vh",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleAddLaw}>
            Agregar Ley
          </Button>
          <LawDisplay ley={scrapedLaws} />
          <Box
            sx={{ display: "flex", justifyContent: "left", mt: 2, mb: 4 }}
          ></Box>
          <Button variant="contained" color="primary" onClick={handleAddLaw}>
            Agregar Ley
          </Button>
        </Box>
      )}
    </>
  );
};

export default AddLawForm;
