import { useEffect, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { lawsState, scrapedLawsState } from "../atoms/leyesAtom";
import leyesServicesAPI from "../api/services/leyes/leyesServicesAPI";

const useLeyes = () => {
  const setLaws = useSetRecoilState(lawsState);
  const setScrapedLawsState = useSetRecoilState(scrapedLawsState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadLaws = useCallback(async () => {
    setLoading(true);
    try {
      const data = await leyesServicesAPI.fetchLaws();
      if (Array.isArray(data)) {
        setLaws(data);
      } else {
        throw new Error("La carga de leyes no devolvió un arreglo");
      }
      setError(null);
    } catch (err) {
      setError(err.message || "Error al cargar las leyes");
      setLaws([]);
    }
    setLoading(false);
  }, [setLaws]);

  const refreshLaws = async () => {
    await loadLaws();
  };

  const loadSingleLaw = async (id) => {
    setLoading(true);
    try {
      const responseData = await leyesServicesAPI.fetchSingleLaw(id);
      const dataEstructured = {
        data: responseData,
      };
      return dataEstructured;
    } catch (error) {
      setError(error.message || "Error al traer una ley");
    }
    setLoading(false);
  };

  const addLaw = async (lawData) => {
    try {
      const response = await leyesServicesAPI.addLaw(lawData);
      await refreshLaws();
    } catch (err) {
      setError(err.message || "Error al añadir la ley");
    }
  };

  const updateLaw = async (id, lawData) => {
    try {
      const updatedLaw = await leyesServicesAPI.updateLaw(id, lawData);
      setLaws((prevLaws) =>
        prevLaws.map((law) => (law.id === id ? updatedLaw : law))
      );
    } catch (err) {
      setError(err.message || "Error al actualizar la ley");
    }
  };

  const deleteLaw = async (id) => {
    try {
      await leyesServicesAPI.deleteLaw(id);
      setLaws((prevLaws) => prevLaws.filter((law) => law.id !== id));
    } catch (err) {
      setError(err.message || "Error al eliminar la ley");
    }
  };

  const handleScrapeLaw = async (url) => {
    setLoading(true);
    try {
      const scrapedLaw = await leyesServicesAPI.scrapeLaw({ url });
      setScrapedLawsState(scrapedLaw);
    } catch (err) {
      setError(err.message || "Error al hacer scraping de la ley");
    }
    setLoading(false);
  };

  return {
    loadLaws,
    loadSingleLaw,
    addLaw,
    updateLaw,
    deleteLaw,
    handleScrapeLaw,
    loading,
    error,
  };
};

export default useLeyes;
