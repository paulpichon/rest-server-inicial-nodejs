const { response, request } = require('express');
// jsonwebtoken
const jwt = require('jsonwebtoken');

// funcion para validar el JSONWEBTOKEN
// esta funcion nos va a servir para verificar si viene el TOKEN, si no viene podemos negar el acceso a las rutas 
const validarJWT = ( req = request, res = response, next ) => {

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
        // creamos una propiedad nueva en el request
        req.uid = uid;

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