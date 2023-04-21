//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//importar constantes
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
//validar correo
const { check } = require('express-validator');
//importar validar campos
const { validarCampos } = require('../middlewares/validar-campos');
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
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    //password
    check('password', 'El password debe ser más de 6 caracteres').isLength({ min: 6 }),
    //validar correo
    check('correo', ' El correo no es válido').isEmail(),
    //rol de usuario
    check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //validar campos
    validarCampos
], usuariosPost);
//PUT
router.put('/:id', usuariosPut);
//DELETE
router.delete('/', usuariosDelete);

//exportamos por default router
module.exports = router;