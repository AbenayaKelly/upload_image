const multer = require('multer');
const path = require('path');

// Configuração para o multer armazenas os arquivos
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        // Não tendo erro os arquivos será salvo na pasta upload
        callback(null, path.join(__dirname, '../upload'));
    },
    filename: (req, file, callback) => {
          // Definindo o nome do arquivo antes de ser salvo mantendo a extensão padrão(exemplo, .png)
        callback(null, Date.now() + path.extname(file.originalname));// Adiciona um timestamp ao nome do arquivo original para evitar arquivos com nomes iguais serem  sobrescritos 
    }
});

const upload = multer({
    storage: storage,
     // Filtro para garantir que apenas imagens sejam aceitas
    fileFilter: (req, file, callback) => {
        const types = /jpeg|jpg|png/;
        const extname = types.test(path.extname(file.originalname).toLowerCase()); //Retorna a extesão do arquivo e converte para minúculas para não ter erro com letras maiúsculas na extensão
        const mimeType = types.test(file.mimetype);// verifica se o tipo MIME, exemplo, "image/png"
    
 // Se a extensão e o MIME forem compativeis com o filtro
        if (extname && mimeType) {
            callback(null, true);//arquivo aceito
        } else {
            callback('É permitido apenas imagens do tipo  (jpeg, jpg, png)');
        }
    },
    limits: { fileSize: 1024 * 1024 * 5 } // Limite de 5MB
}).single('image');

const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err });
        }
          //Se não houver arquivo na requisição
        if (!req.file) {
            return res.status(400).send({ message: 'Nenhum arquivo foi enviado!' });
        }
        res.status(200).send({ message: 'Upload bem-sucedido!', file: req.file });
    });
};

module.exports = { uploadImage };
