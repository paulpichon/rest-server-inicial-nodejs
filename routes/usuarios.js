//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//importar constantes
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//GET
router.get('/', usuariosGet);
//POST
router.post('/', usuariosPost);
//PUT
router.put('/:id', usuariosPut);
//DELETE
router.delete('/', usuariosDelete);

//exportamos por default router
module.exports = router;