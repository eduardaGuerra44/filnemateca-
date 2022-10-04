// importação da biblioteca Express
const express = require('express');
const session = require('express-session');
const path = require('path');
const middlewaresGlobal = require('./middlewares/middlewaresGlobal');

// importando roteadores 
const filmesRouter = require('./routers/filmesRouter');
const admRouter = require('./routers/AdmRouter')

//criando um servidor
const servidor = express();

//Configuração do Template Engine
servidor.set('view engine', 'ejs')

//configurando a pasta public como contenedora dos arquivos astáticos
servidor.use(express.static(path.join(__dirname, 'public')));

// configurando o middware que lida com session
servidor.use(session({secret:"SEGREDO", saveUninitialized: false, resave: true }));
// põe as informações do usuario no req.body
servidor.use(express.urlencoded({ extended: false}));

servidor.use(middlewaresGlobal)
// Usando o roteador
servidor.use('/', filmesRouter);
servidor.use('/', admRouter)



// Pôr o servidor para ouvir a resquisição 
servidor.listen(3000); 
