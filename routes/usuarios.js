//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//importar constantes
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
//validar correo
const { check } = require('express-validator');
//importar validar campos
const { validarCampos } = require('../middlewares/validar-campos');
//Importamos el Rol
const Rol = require('../models/rol');
//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//GET
router.get('/', usuariosGet);
//POST
router.post('/', [
    //middlwares
    //nombre
    // This is analogous to .not().isEmpty() = .notEmpty()
    check('nombre', 'El nombre es obligatorio').trim().notEmpty(),
    //password
    check('password', 'El password debe ser más de 6 caracteres').trim().isLength({ min: 6 }),
    //validar correo
    check('correo', ' El correo no es válido').isEmail(),
    //rol de usuario
    //esta es una forma de hacerlo, pero lo que necesitamos es compararlo contra la base de datos
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    //en este custom nosotros podemos hacer una funcion para poder comprar el request vs la base de datos
    //A rol le podemos asignar un valor por defecto que seria un String vacio: rol = ''
    check('rol').custom( async(rol = '') => {
        //Se va a buscar con el Request alguna coincidencia vs la base de datos
        const existeRol = await Rol.findOne( { rol })
        //si existeRol no existe quiere decir que el ROL no existe en al base de datos
        if (!existeRol) {
            //y lanzamos un error personalizado con throw new Error
            throw new Error(`El rol ${ rol } no esta registrado en la BD`);
        }

    }) ,
    //validar campos
    validarCampos
], usuariosPost);
//PUT
router.put('/:id', usuariosPut);
//DELETE
router.delete('/', usuariosDelete);

//exportamos por default router
module.exports = router;