const express = require('express');
const { uploadImage } = require('../controllers/uploadController');
const router = express.Router();

// Definindo a rota POST para upload
router.post('/upload', uploadImage);

module.exports = router;
