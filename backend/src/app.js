const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Çevresel deðiþkenleri yüklemek için

// Controller'larý içeri aktar
const mapController = require('./controllers/mapController');

// Express uygulamasýný baþlat
const app = express();

// Port numarasýný .env dosyasýndan al veya varsayýlan olarak 3000 kullan
const PORT = process.env.PORT || 3000;

// Middleware'lar
app.use(cors()); // CORS middleware'ý
app.use(express.json()); // JSON verilerini iþleyebilmek için

// Route'larý tanýmla
app.get('/api/map/config', mapController.getMapConfig);
app.get('/api/user/location', mapController.getUserLocation);

// Statis dosyalar için servis klasörü (Eðer frontend build'ini sunuyorsanýz)
app.use(express.static('public'));

// Anasayfaya basit bir yanýt ver (Ýsteðe baðlý)
app.get('/', (req, res) => {
  res.send('Welcome to the SOA-based Map API');
});

// Sunucuyu belirtilen portta baþlat
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Eðer olasý hatalar için genel bir error handler eklemek isterseniz:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
