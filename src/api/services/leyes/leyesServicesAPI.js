import axios from "../../axios/axiosConfig";
const API_URL = "/api/leyes";

// Obtener todas las leyes
const fetchLaws = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const fetchSingleLaw = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Agregar una nueva ley
const addLaw = async (lawData) => {
  try {
    const response = await axios.post(API_URL, lawData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar una ley existente
const updateLaw = async (id, lawData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, lawData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar una ley
const deleteLaw = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Scrapeando una ley
const scrapeLaw = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/scrape`, url);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  fetchLaws,
  fetchSingleLaw,
  addLaw,
  updateLaw,
  deleteLaw,
  scrapeLaw,
};
