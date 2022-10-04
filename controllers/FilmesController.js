const res = require('express/lib/response')
const uniqid = require('uniqid')
const fs = require('fs')

const FilmesController = {
    index: (req, res) => {
        const filmes = require('../database/filmes.json');
        res.render('index.ejs', { filmes })
    },

    listarFilme: (req, res) => {
        //importando o array de filmes
        const filmes = require('../database/filmes.json')
        res.send(filmes)
        console.log('requisição filme feita');
    },

    pelaPosicao: (req, res) => {
        //capturei a posição do filme desejado. 
        let posicao = req.params.posicao;

        //carregar o array 
        const filmes = require('../database/filmes.json');
        //enviar para o cliente a view com o filme da posição desejada. 
        res.render('filme.ejs', { filme: filmes[posicao] });

        let filme = filmes[posicao];
        res.render('filme.ejs', { filme });
    },


    bucarPorTrecho: (req, res) => {
        // 1: Salvar o trecho na variável 'trecho';
        let trecho = req.query.busca;
        // 2: Importar o conteúdo de filmes.json para uma constante 'filmes';
        const filmes = require('../database/filmes.json');
        // 3: Filtrar o array de filmes, somente os filmes que possuam o trecho no título;
        // (Lembrem da função filmes.filter)
        let filtradora = filme => {
            return filme.titulo.includes(trecho);
        }
        let resultadoDaBusca = filmes.filter(filtradora);
        // 4: Enviar para o cliente (usando res.send) o resultado da filtragem.
        res.render('index.ejs', { filmes: resultadoDaBusca });
    },


    buscarPorGenero: (req, res) => {
        let genero = req.params.genero;
        const generos = require('../database/filmes.json');
        let generosFiltrados = generobuscado => {
            return generobuscado.generos.includes(genero)
        }
        let resultadoGeneros = generos.filter(generosFiltrados);

        res.send(resultadoGeneros)
    },

    buscaPorId: (req, res) => {
        // capturar o id do filme
        let id = req.params.id;
        // importação do conteúdo de filmes.json para uma const.
        const filmes = require('../database/filmes.json');


        let filtradora = filme => {
            if (filme.id == id) {
                return true;
            } else {
                return false;
            }
        }

        // //encontrar o id com o filme desejado 
        const filme = filmes.find(filtradora)
        res.render('filme.ejs', { filme })
    },
    addFilme: (req,res) =>{
        
        // 1 - Criar um objeto com a estrutura acima e guardar numa var filme:
        //      1.1: Criar o ID
        let novoId = uniqid();
        //      1.2: Capturar os generos do filme
        let generos = [];
        for(let i in req.body){
            if(req.body[i] == "on"){
                generos.push(i);
            }
        }
        //      1.3: Todo o resto
        let filme = {
            "id": novoId,
            "cartaz": req.file.filename,
            "titulo": req.body.titulo,
            "generos": generos,
            "censura": req.body.censura,
            "trailer": req.body.trailer,
            "sinopse": req.body.sinopse
         }

        // 2 - Salvar o objeto filme no arquivo filmes.json
        //      2.1 - Importar o array de filmes
        const filmes = require( '../database/filmes.json')
        //      2.2 - Adicionar o filme ao final do array de filmes
        filmes.push(filme);
        //      2.3 - salvar todo o array de filmes no arquivo filmes.json
        fs.writeFileSync(
            __dirname + '/../database/filmes.json', 
            JSON.stringify(filmes, null,4)
        )
       res.send('filme adicionado com sucesso!!')
    }
}





module.exports = FilmesController;