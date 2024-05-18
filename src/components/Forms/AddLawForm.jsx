import React, { useState } from "react";
import { TextField, Box, Fab, Typography, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useLeyes from "../../hooks/useLeyes";
import { useRecoilValue } from "recoil";
import { scrapedLawsState } from "../../atoms/leyesAtom";
import LoadingComponent from "../Loading/Loading";
import LawDisplay from "../ScrapedViews/LawDisplay";
import leyesServicesAPI from "../../api/services/leyes/leyesServicesAPI";

const AddLawForm = () => {
  const [url, setUrl] = useState("");
  const [lawName, setLawName] = useState("");
  const scrapedLaws = useRecoilValue(scrapedLawsState);
  const { handleScrapeLaw, loading, loadLaws } = useLeyes();

  const handlePreview = async () => {
    if (url && lawName) {
      try {
        await handleScrapeLaw(url, lawName);
      } catch (error) {
        console.error("Error al hacer scraping de la ley:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleAddLaw = async () => {
    if (!scrapedLaws || !scrapedLaws.data) {
      console.error("No hay datos de leyes scrapeados para agregar.");
      return;
    }

    const lawData = {
      nombre: lawName,
      url: url,
      contenido: scrapedLaws.data,
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
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Buscar/Agregar nuevas de leyes
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <TextField
          label="URL de la Ley"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500, mr: 2 }}
        />
        <TextField
          label="Nombre de la Ley"
          value={lawName}
          onChange={(e) => setLawName(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500, mr: 2 }}
        />
        <Fab
          color="primary"
          aria-label="search"
          onClick={handlePreview}
          disabled={loading}
        >
          <SearchIcon />
        </Fab>
      </Box>
      {loading && <LoadingComponent />}
      {scrapedLaws && (
        <>
          <LawDisplay ley={scrapedLaws} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddLaw}>
              Agregar Ley
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default AddLawForm;
