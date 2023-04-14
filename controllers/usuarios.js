//importamos reponse de express para ayudarnos con el tipado
const { response } = require("express");
//importamos nuestro Schema Usuario 
//ponemos la U mayuscula de Usuario porque es un estandar que me va a permitir crear instancias de mi modelo
const Usuario = require('../models/usuario');

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
const usuariosPost = async(req, res = response) => {

    //body
    const body = req.body;
    //creamos una nuesva instancia de Usuario
    //y es por ello que lleva U mayuscula Usuario
    //y mandamos como argumento el body
    const usuario = new Usuario( body );

    //Grabar el registro en la coleccion
    await usuario.save();

    res.json({
        usuario
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