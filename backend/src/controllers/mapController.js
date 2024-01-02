const axios = require('axios');

// .env dosyasýndan API anahtarýný yükle
require('dotenv').config();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getMapConfig = (req, res) => {
  const mapConfig = {
    center: { lat: 41.0082, lng: 28.9784 }, // Ýstanbul'un koordinatlarý
    zoom: 12
  };
  res.json(mapConfig);
};

const getUserLocation = async (req, res) => {
  try {
    const { lat, lng } = req.query; // Eðer frontend'den konum bilgisi gönderilirse kullanýlabilir

    // Kullanýcý konum bilgisi saðlanmýþsa kullan, aksi takdirde varsayýlan olarak Ýstanbul'u kullan
    const location = lat && lng ? { lat, lng } : { lat: 41.0082, lng: 28.9784 };

    // Kullanýcý konumunu bulmak için ek iþlemler burada yapýlabilir
    // Örneðin, gerçek zamanlý konum için Geolocation API kullanýlabilir

    res.json(location);
  } catch (error) {
    console.error('Error retrieving user location:', error);
    res.status(500).send('Error retrieving user location');
  }
};

module.exports = {
  getMapConfig,
  getUserLocation
};
