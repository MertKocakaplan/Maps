const axios = require('axios');
require('dotenv').config();

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const googleMapsClient = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  params: { key: GOOGLE_MAPS_API_KEY },
});

const getGeocode = async (address) => {
  try {
    const response = await googleMapsClient.get('/geocode/json', { params: { address } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPlacesNearby = async (location, radius, type) => {
  try {
    const response = await googleMapsClient.get('/place/nearbysearch/json', { params: { location, radius, type } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDistanceMatrix = async (origins, destinations) => {
  try {
    const response = await googleMapsClient.get('/distancematrix/json', { params: { origins, destinations } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Maps Embed API ve Maps JavaScript API i�in do�rudan frontend'de kullan�lacak ba�lant�lar olu�turulur.
// Bu API'ler genellikle frontend'de, harita g�mme veya harita �zerinde dinamik i�lemler i�in kullan�l�r.

module.exports = {
  getGeocode,
  getPlacesNearby,
  getDistanceMatrix,
  // Di�er API i�levleri burada tan�mlanabilir.
};
