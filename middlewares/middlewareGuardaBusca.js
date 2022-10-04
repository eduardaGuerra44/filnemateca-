// Importar biblioteca de mexer com arquivos; 
const fs = require('fs');


module.exports = (req, res, next) => {

    //capturar o trecho buscado;
    let trechoBuscado = req.query.busca + "\n";

    // salvar o treecho buscado no final de uma arquivo; 
    fs.writeFileSync("./trechosBuscados.txt", trechoBuscado, {flag: 'a+'});
    
    // Passando a requisição à diante. 
    next();
}