//funcion para el AUTH actualizado
const { response } = require("express");
// bcryptjs
const bcryptjs = require('bcryptjs');
//importar el modelo del Usuario
const Usuario = require('../models/usuario');
// Funcion para generar el JWT
const { generarJWT } = require("../helpers/generar-jwt");
// Google Verify
const { googleVerify } = require("../helpers/google-verify");

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
        const token = await generarJWT( usuario.id );
        

        res.json({
            usuario,
            token
        });

        
    } catch (error) {
        console.log( error );
        //Internal Server Error
        return res.status( 500 ).json({
            msg: 'Hubo un error, favor de contactar a soporte'
        });
    }

}

// Google Sign In/ Authentication
const googleSignIn = async( req, res) => {
    
    // id_token debe de venir en el body
    const { id_token } = req.body;

    try {
        
        // const googleUser = await googleVerify( id_token );
        // console.log( googleUser );
        const { nombre, img, correo } = await googleVerify( id_token );

        // verificar si el correo existe en las bases de datos
        let usuario = await Usuario.findOne({ correo });
        // si el usuario no existe
        if (!usuario) {
            // Tengo quie crear el usuario en caso de que no exista
            // recordar que en password no importa lo que mandemos ya que no podra hacer match por el HASH que usamos para encriptar las PASSWORD
            const data = {
                nombre,
                correo,
                password: 'obligatorio',
                img,
                google: true

            }
            // creo un nuevo usuario
            usuario = new Usuario( data );
            // Guardamos el usuario
            await usuario.save();
        }

        // validar si el usuario tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado - estado-false'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        // respuesta
        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log( error );
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
}

//exports
module.exports = {
    login,
    googleSignIn
}