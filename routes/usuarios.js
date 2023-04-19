//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//importar constantes
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
//validar correo
const { check } = require('express-validator');
//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//GET
router.get('/', usuariosGet);
//POST
router.post('/', [
    //validar correo
    check('correo', ' El correo no es válido').isEmail(),
], usuariosPost);
//PUT
router.put('/:id', usuariosPut);
//DELETE
router.delete('/', usuariosDelete);

//exportamos por default router
module.exports = router;