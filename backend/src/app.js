const express = require('express');
const cors = require('cors');
require('dotenv').config(); // �evresel de�i�kenleri y�klemek i�in

// Controller'lar� i�eri aktar
const mapController = require('./controllers/mapController');

// Express uygulamas�n� ba�lat
const app = express();

// Port numaras�n� .env dosyas�ndan al veya varsay�lan olarak 3000 kullan
const PORT = process.env.PORT || 3000;

// Middleware'lar
app.use(cors()); // CORS middleware'�
app.use(express.json()); // JSON verilerini i�leyebilmek i�in

// Route'lar� tan�mla
app.get('/api/map/config', mapController.getMapConfig);
app.get('/api/user/location', mapController.getUserLocation);

// Statis dosyalar i�in servis klas�r� (E�er frontend build'ini sunuyorsan�z)
app.use(express.static('public'));

// Anasayfaya basit bir yan�t ver (�ste�e ba�l�)
app.get('/', (req, res) => {
  res.send('Welcome to the SOA-based Map API');
});

// Sunucuyu belirtilen portta ba�lat
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// E�er olas� hatalar i�in genel bir error handler eklemek isterseniz:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
