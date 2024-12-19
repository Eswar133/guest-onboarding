const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const multer = require('multer');
const path = require('path');

// Middleware for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Hotel Routes
router.get('/', hotelController.getAllHotels);
router.get('/add', hotelController.renderAddHotel);
router.post('/add', upload.single('logo'), hotelController.addHotel);
router.get('/generate-qr/:hotelId', hotelController.generateQRCode);

module.exports = router;
