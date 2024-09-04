import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const calculateRoute = async (origin, destination, preferences) => {
  try {
    console.log('Sending request to calculate route...');
    const response = await axios.post(`${API_URL}/route/calculate`, { origin, destination, preferences });
    console.log('Received response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in calculateRoute:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const generateSuggestions = async (tripId, currentLocation) => {
  const response = await axios.post(`${API_URL}/suggestions/generate`, { tripId, currentLocation });
  return response.data;
};

export const approveSuggestion = async (tripId, suggestion) => {
  const response = await axios.post(`${API_URL}/suggestions/approve`, { tripId, suggestion });
  return response.data;
};

export const denySuggestion = async (tripId, suggestion) => {
  const response = await axios.post(`${API_URL}/suggestions/deny`, { tripId, suggestion });
  return response.data;
};

export const resuggestStop = async (tripId, currentLocation) => {
  const response = await axios.post(`${API_URL}/suggestions/resuggest`, { tripId, currentLocation });
  return response.data;
};

export const exportRoute = async (tripId) => {
  const response = await axios.post(`${API_URL}/route/export`, { tripId });
  return response.data.exportedRoute;
};
