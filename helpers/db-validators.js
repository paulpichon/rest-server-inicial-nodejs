//Importamos el Rol
const Rol = require('../models/rol');

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
//exports
module.exports = esRolValido;