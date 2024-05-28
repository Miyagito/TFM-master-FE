import axios from "../../axios/axiosConfig";

const API_URL = "/api/oposiciones";

// Obtener todas las oposiciones
export const fetchOposiciones = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Agregar una nueva oposición
export const addOposicion = async (oposicionData) => {
  try {
    const response = await axios.post(API_URL, oposicionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Actualizar una oposición existente
export const updateOposicion = async (id, oposicionData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, oposicionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Eliminar una oposición
export const deleteOposicion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
