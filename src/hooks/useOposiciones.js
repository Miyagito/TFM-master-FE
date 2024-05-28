import { useState, useCallback, useEffect } from "react";
import {
  fetchOposiciones,
  addOposicion,
  updateOposicion,
  deleteOposicion,
} from "../api/services/oposiciones/oposicionesServiceAPI";

const useOposiciones = () => {
  const [oposiciones, setOposiciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOposiciones = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchOposiciones();
      setOposiciones(data);
    } catch (error) {
      setError("Error al cargar las oposiciones: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddOposicion = async (oposicionData) => {
    setLoading(true);
    try {
      await addOposicion(oposicionData);
      await loadOposiciones();
    } catch (error) {
      setError("Error al añadir la oposición: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOposicion = async (id, oposicionData) => {
    setLoading(true);
    try {
      await updateOposicion(id, oposicionData);
      await loadOposiciones(); // Refresh to show updated data
    } catch (error) {
      setError("Error al actualizar la oposición: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOposicion = async (id) => {
    setLoading(true);
    try {
      await deleteOposicion(id);
      await loadOposiciones(); // Remove the deleted item from the list
    } catch (error) {
      setError("Error al eliminar la oposición: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOposiciones();
  }, [loadOposiciones]);

  return {
    oposiciones,
    loading,
    error,
    handleAddOposicion,
    handleUpdateOposicion,
    handleDeleteOposicion,
    loadOposiciones,
  };
};

export default useOposiciones;
