const axios = require('axios');

// .env dosyas�ndan API anahtar�n� y�kle
require('dotenv').config();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getMapConfig = (req, res) => {
  const mapConfig = {
    center: { lat: 41.0082, lng: 28.9784 }, // �stanbul'un koordinatlar�
    zoom: 12
  };
  res.json(mapConfig);
};

const getUserLocation = async (req, res) => {
  try {
    const { lat, lng } = req.query; // E�er frontend'den konum bilgisi g�nderilirse kullan�labilir

    // Kullan�c� konum bilgisi sa�lanm��sa kullan, aksi takdirde varsay�lan olarak �stanbul'u kullan
    const location = lat && lng ? { lat, lng } : { lat: 41.0082, lng: 28.9784 };

    // Kullan�c� konumunu bulmak i�in ek i�lemler burada yap�labilir
    // �rne�in, ger�ek zamanl� konum i�in Geolocation API kullan�labilir

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
