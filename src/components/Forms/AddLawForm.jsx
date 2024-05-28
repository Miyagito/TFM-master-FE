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
  const fixedUrl = "https://www.boe.es/buscar/boe.php";
  const [lawName, setLawName] = useState("");
  const scrapedLaws = useRecoilValue(scrapedLawsState);
  const { handleScrapeLaw, loading, loadLaws } = useLeyes();

  const handlePreview = async () => {
    if (lawName) {
      try {
        await handleScrapeLaw(fixedUrl, lawName);
      } catch (error) {
        console.error("Error al hacer scraping de la ley:", error);
      }
    } else {
      alert("Por favor, ingrese el nombre de la ley.");
    }
  };

  const handleAddLaw = async () => {
    if (!scrapedLaws || !scrapedLaws.data) {
      console.error("No hay datos de leyes scrapeados para agregar.");
      return;
    }

    const lawData = {
      nombre: lawName,
      url: fixedUrl,
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
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 4 }}>
        Buscar leyes
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <TextField
          label="URL de la Ley"
          value={fixedUrl}
          fullWidth
          sx={{ maxWidth: 500, mr: 2 }}
          InputProps={{
            readOnly: true,
          }}
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
        <Box
          sx={{
            margin: "20px",
            overflowY: "auto",
            maxHeight: "900px",
            backgroundColor: "rgb(250, 250, 250)",
          }}
        >
          <LawDisplay ley={scrapedLaws} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 4 }}>
            <Button variant="contained" color="primary" onClick={handleAddLaw}>
              Agregar Ley
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AddLawForm;
