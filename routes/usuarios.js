//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//creamos constante router para asignarle la funcion Router de express
const router = Router();

//RUTAS
//GET
router.get('/', (req, res) => {
    res.json({
        msg: 'GET API'
    });
});
//POST
router.post('/', (req, res) => {
    res.json({
        msg: 'POST API'
    });
});
//PUT
router.put('/', (req, res) => {
    res.json({
        msg: 'PUT API'
    });
});
//DELETE
router.delete('/', (req, res) => {
    res.json({
        msg: 'DELETE API'
    });
});

//exportamos por default router
module.exports = router;