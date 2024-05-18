import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import useLeyes from "../../hooks/useLeyes";

const DeleteButtonLaw = ({ lawId, serviceCallBack }) => {
  const { loadLaws } = useLeyes();
  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta ley?")) {
      await serviceCallBack(lawId);
      loadLaws();
    }
  };

  return (
    <IconButton
      color="error"
      onClick={handleDelete}
      size="small"
      sx={{ ml: 2, position: "relative", right: 0 }}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteButtonLaw;
