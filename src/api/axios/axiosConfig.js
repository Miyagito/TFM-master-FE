import axios from "axios";

// Configura la URL base de todas las solicitudes HTTP
axios.defaults.baseURL = "http://localhost:3000";

// Habilita el envío de cookies con cada solicitud al servidor
axios.defaults.withCredentials = true;

// Exporta la instancia configurada de axios
export default axios;
