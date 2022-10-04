//importando o multer
const multer = require('multer');

//criando um Storage; 
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../public/img")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }

    }
)
//criando o middleware do multer
const middleware = multer({ storage }).single("cartaz");


// exportando o middleware. 
module.exports = middleware;