module.exports = (req, res, next) => {
    let hora = (new Date()).getHours();

    if (hora < 8 || hora >= 22){
        res.send("já tá tarde... vá para casa");
    } else {
        console.log("a requisição está indo")
        next();  
         
        }
    }

