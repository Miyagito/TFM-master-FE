import React, { forwardRef } from "react";
import { selectedSectionsState } from "../../atoms/printAtom";
import { useRecoilState } from "recoil";
import { Typography, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PrintView = forwardRef((props, ref) => {
  const [selectedSections, setSelectedSections] = useRecoilState(
    selectedSectionsState
  );
  const navigate = useNavigate();

  const handleBack = () => {
    setSelectedSections([]);
    navigate(-1);
  };

  const handlePrint = () => window.print();

  return (
    <Box
      ref={ref}
      sx={{
        p: 3,
        minHeight: "100vh",
        overflowY: "auto",
        height: "100%",
      }}
    >
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 4, mr: 2 }}>
        Volver
      </Button>
      <Button variant="contained" onClick={handlePrint} sx={{ mb: 4 }}>
        Imprimir
      </Button>
      {selectedSections.map((section, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            mb: 2,
            p: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 1,
              fontSize: "1.25rem",
            }}
          >
            {section.contenido}
          </Typography>
          {section.children &&
            section.children.map((child, idx) => (
              <Typography
                key={idx}
                paragraph
                sx={{
                  textIndent: "2em",
                  textAlign: "justify",
                  mt: 1,
                  fontSize: "1rem",
                }}
              >
                {child.contenido}
              </Typography>
            ))}
        </Paper>
      ))}
    </Box>
  );
});

export default PrintView;
