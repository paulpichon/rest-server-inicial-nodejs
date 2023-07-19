
//importar validar campos
const validarCampos = require('../middlewares/validar-campos');
// validar el JWT
const validarJWT = require('../middlewares/validar-jwt');
//importar funcion para validar el ROL del usuario autenticado
const validaRoles = require('../middlewares/validar-roles');

//exports
//Para exportar todo lo que tenga cada uno de los archivos podemo usar el operador spread
//...mas nombre de la constante
module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles
}