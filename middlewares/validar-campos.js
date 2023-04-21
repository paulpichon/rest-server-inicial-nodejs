//validar correo
const { validationResult } = require("express-validator");

//se poner un tercer argumento llamado next
//este argumento es una funcion nos va a permitir seguir con el siguiente comando
const validarCampos = ( req, res, next) => {

    //constante para los errores
    const errors = validationResult( req );
    //si hay errores
    if ( !errors.isEmpty() ) {
        //retornamos los errores encontrados
        return res.status( 400 ).json( errors );
    }

    //se llama la funcion next()
    //para seguir con la ejecucion del codigo
    next();

}

module.exports = {
    validarCampos
}