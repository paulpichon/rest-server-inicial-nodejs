//configuracion de Router de Express
const { Router } = require('express');
//validaciones
const { check } = require('express-validator');


//validar campos
const { validarCampos } = require('../middlewares/validar-campos');

//importamos los controladores
const { login, 
        googleSignIn 
} = require('../controllers/auth');


//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//POST
router.post('/login', [
    // VALIDAR QUE VENGA EL CORREO
    check('correo', 'El correo es obligatorio').isEmail(),
    // contraseña
    check('password', 'La contraseña es obligatoria').trim().notEmpty(),
    //llamar mi custom middleware para mostrar los errores
    validarCampos
], login);

// GOOGLE AUTHENTICATION
//POST
router.post('/google', [
    // VALIDAR QUE VENGA EL ID_TOKEN
    check('id_token', 'id_token de Google es necesario').notEmpty(),
    //llamar mi custom middleware para mostrar los errores
    validarCampos
], googleSignIn);


//exports
module.exports = router;