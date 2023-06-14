//funcion para el AUTH
const { response } = require("express");
// bcryptjs
const bcryptjs = require('bcryptjs');
//importar el modelo del Usuario
const Usuario = require('../models/usuario');

const login = async( req, res = response ) => {

    //body
    const { correo, password } = req.body;

    //trycatch por si algo sale mal
    try {

        //verificar si el EMAIL existe
        const usuario = await Usuario.findOne({ correo });
        //si no existe el usuario
        if ( !usuario ) {
            return res.status( 400 ).json({
                msg: 'Usuario/Password no son correctos - correo'
            });
        }

        //verificar si el usuario esta activo en la BD
        //si el estado del usuario === false
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - estado:false'
            });
        }

        // verificar la contraseña
        //comparar las contraseñas
        // .compareSync( contraseña del body, contraseña de la BD)
        const validarPassword = bcryptjs.compareSync( password, usuario.password );
        // si no es valida la contraseña
        if (!validarPassword) {
            // mostrar contraseña
            return res.status(400).json({
                msg: 'Usuario/password no son correctos - password'
            });
        }

        // Generar el JWT


        res.json({
            msg: 'Login OK'
        });

        
    } catch (error) {
        console.log( error );
        //Internal Server Error
        return res.status( 500 ).json({
            msg: 'Hubo un error, favor de contactar a soporte'
        });
    }

}
//exports
module.exports = {
    login
}