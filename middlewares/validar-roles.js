const { response } = require("express")

//funcion para validar el rol del usuario que quiere eliminar un usuario
const esAdminRole = ( req, res = response, next ) => {

    // creamos una propiedad nueva en el request
    //req.usuario = usuario; -> este request que viene del archivo validar-jwt.js va a estar diponible en todos los middelwares de la ruta, en este caso de la ruta DELETE, por lo tanto ya no va a ser necesario importar el model del usuario para traer la informacion

    
    //verificar que si no trae el usuario el request
    if ( !req.usuario ) {
        //si no lo trae, quiere decir que hay un problema interno mio
        return res.status( 500 ).json({
            msg: 'Se quiere verificar el ROLE sin validar el TOKEN primero'
        });
    }

    //request usuario
    //req.usuario -> se genero en el archivo validar-jwt.js
    const { rol, nombre } = req.usuario;  
    //verificar el ROL del usuario
    if ( rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - Debe ser ADMIN_ROLE para hacer esto`
        });
    }


    //pasar al siguiente middleware
    next();

}
//exports
module.exports = {
    esAdminRole
}