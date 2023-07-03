const { response, request } = require('express');
// jsonwebtoken
const jwt = require('jsonwebtoken');
//Modelo usuario
const Usuario = require('../models/usuario');

// funcion para validar el JSONWEBTOKEN
// esta funcion nos va a servir para verificar si viene el TOKEN, si no viene podemos negar el acceso a las rutas 
const validarJWT = async( req = request, res = response, next ) => {

    //header
    // x-token = headers postman
    const token = req.header('x-token');

    // si no viene token
    if ( !token ) {
        // 401 = unauthorized -> indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    // para mayor seguridad hacemos un try catch para verificar si el TOKEN es valido
    try {
     
        // funcion para verificar el JWT
        // desestructuramos uid
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al UID
        //traemos al usuario que corresponde al UID
        const usuario = await Usuario.findById( uid );

        //si el usuario no existe en la BD
        //esta alerta saldra si el usuario ya no existe fisicamente en la BD
        if ( !usuario ) {
            return res.status(401).json({
                //mostramos alerta
                msg: 'Token no válido - usuario no existe en BD'
            });
        }

        //validar que el usuario autenticado tenga estado:true
        if ( !usuario.estado ) {
            return res.status(401).json({
                //mostramos alerta
                msg: 'Token no válido - usuario con estado:false'
            });
        }

        // creamos una propiedad nueva en el request
        req.usuario = usuario;
        //pasar al siguiente MIDDLEWARE
        next();
        
    } catch (error) {
        console.log( error );
        // 401 = unauthorized -> indica que la petición (request) no ha sido ejecutada porque carece de credenciales válidas de autenticación para el recurso solicitado
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}
// exports
module.exports = {
    validarJWT
}