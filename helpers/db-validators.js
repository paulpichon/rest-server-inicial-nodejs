//Importamos el Rol
const Rol = require('../models/rol');
//model usuario
const Usuario = require('../models/usuario');

//funcion para validar Rol contra la BD
const esRolValido = async(rol = '') => {
    //Se va a buscar con el Request alguna coincidencia vs la base de datos
    const existeRol = await Rol.findOne( { rol })
    //si existeRol no existe quiere decir que el ROL no existe en al base de datos
    if (!existeRol) {
        //y lanzamos un error personalizado con throw new Error
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }

}
//verificar is existe el email en la base de datos
const emailExiste = async( correo = '' ) => {

    const existeEmail = await Usuario.findOne({ correo });
    //si existe el correo
    if ( existeEmail ) {
        //detener la ejecucion con un return y un mensaje
        throw new Error(`El correo: ${ correo } ya esta registrado en la base de datos`);
        
    }

}




//exports
module.exports = {
    esRolValido,
    emailExiste
};