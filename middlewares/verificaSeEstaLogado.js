module.exports = (req, res, next) => {

    //verificar se o usuário está logado; 
    if (req.session.usuario == undefined) {
        // se não estiver, direcionar para o endereço /login
        res.redirect('/login');

    } else {
        // se estiver. ir adiante
        next();
    }


}