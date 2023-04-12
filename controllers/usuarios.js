//importamos reponse de express para ayudarnos con el tipado
const { response } = require("express");

//GET
const usuariosGet = (req, res = response) => {

    //query params
    const { token, apikey } = req.query;

    res.json({
        msg: 'GET API - Controller',
        token,
        apikey
    });
}
//POST
const usuariosPost = (req, res = response) => {

    //body que viene del foorm
    const { nombre, edad } = req.body;

    res.json({
        msg: 'POST API - Controller',
        nombre, 
        edad
    });
}
//PUT
const usuariosPut = (req, res = response) => {

    //id desde la URL
    const { id } = req.params;

    res.json({
        msg: 'PUT API - Controller',
        id
    });
}
//DELETE
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - Controller'
    });
}
//exports
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}