const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Usar as rotas de upload
app.use('/', uploadRoutes);

// Servir arquivos estáticos da pasta uploads
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
