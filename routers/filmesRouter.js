// Importar a biblioteca express
const express = require("express");

// Imporrtar o middlewwares
const middlewareGuardaBusca = require("../middlewares/middlewareGuardaBusca")

// Criar o roterador com express.Router
const router = express.Router(); 

// Importar FilmesController
const FilmesController = require('../controllers/FilmesController')
    // criando as rotas 
    router.get("/", FilmesController.index);

    // criar rota para filme
    router.get('/filme', FilmesController.listarFilme);
    
    router.get('/filmes/:id', FilmesController.buscaPorId)
    
    router.get('/busca', middlewareGuardaBusca, FilmesController.bucarPorTrecho)
    
    router.get('/generos/:genero', FilmesController.buscarPorGenero)

    router.get('/buscaporid/:id', FilmesController.buscaPorId)

module.exports = router;