//importamos reponse de express para ayudarnos con el tipado
const { response, request } = require("express");
//encriptar la contraseña
const bcryptjs = require('bcryptjs');
//importamos nuestro Schema Usuario 
//ponemos la U mayuscula de Usuario porque es un estandar que me va a permitir crear instancias de mi modelo
const Usuario = require('../models/usuario');


//GET
const usuariosGet = (req = request, res = response) => {

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
    const { nombre, correo, password, rol } = req.body;
    //creamos una nuesva instancia de Usuario
    //y es por ello que lleva U mayuscula Usuario
    //y mandamos como argumento el body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar la contraseña
    //por defecto esta en 10 = genSaltSync(10) = genSaltSync()
    //salt
    const salt = bcryptjs.genSaltSync();
    //hash
    //hashSync( password, salt), como primer argumento espera el string que vamos a encriptar en este caso es el PASSWORD y como segundo parametro es el SALT
    usuario.password = bcryptjs.hashSync( password, salt);

    //Grabar el registro en la coleccion
    await usuario.save();

    res.json({
        usuario
    });
}
//PUT
const usuariosPut = async(req, res = response) => {

    //id desde la URL
    const { id } = req.params;
    //desestructurar de la request.body
    //tambien extraemos el _ID si es que viene
    const { _id, password, google, correo, ...resto } = req.body;
    //validar contra la base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    //actualizar registro
    //.findByIdAndUpdate('id del registro que se va actualizar', 'informacion a actualizar')
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        usuario
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