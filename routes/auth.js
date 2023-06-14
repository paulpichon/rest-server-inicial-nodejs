//configuracion de Router de Express
const { Router } = require('express');
//validaciones
const { check } = require('express-validator');
//importamos los controladores
const { login } = require('../controllers/auth');

//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//GET
router.post('/login', login);


//exports
module.exports = router;