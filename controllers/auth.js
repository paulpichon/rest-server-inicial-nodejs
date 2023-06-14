//funcion para el AUTH
const { response } = require("express");

const login = ( req, res = response ) => {

    res.json({
        msg: 'Login OK'
    });

}
//exports
module.exports = {
    login
}