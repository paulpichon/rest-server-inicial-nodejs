//usuarios
//configuracion de Router de Express
const { Router } = require('express');
//validar correo
const { check } = require('express-validator');

//importar los middlewares
//ya no se ponde el nombre del archivo INDEX.JS ya que por defecto la carpeta middlewares detecta el archivo index
const { validarCampos, 
        validarJWT, 
        esAdminRole, 
        tieneRole
} = require('../middlewares');

//inmportar la funcion esRolValido
const { esRolValido, 
        emailExiste, 
        existeUsuarioPorId
} = require('../helpers/db-validators');

//importar constantes
const { usuariosGet, 
        usuariosPost, 
        usuariosPut, 
        usuariosDelete 
} = require('../controllers/usuarios');




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
    //validar correo si es valido
    check('correo', ' El correo no es válido').isEmail(),
    //verificar si existe el correo en la BD
    check('correo').custom( emailExiste ),
    //rol de usuario
    //esta es una forma de hacerlo, pero lo que necesitamos es compararlo contra la base de datos
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    //en este custom nosotros podemos hacer una funcion para poder comprar el request vs la base de datos
    //A rol le podemos asignar un valor por defecto que seria un String vacio: rol = ''
    check('rol').custom( esRolValido ) ,
    //validar campos
    validarCampos
], usuariosPost);
//PUT
router.put('/:id',[
    //verificar si el ID es un ID valido de MONGO con express validator
    check('id', 'No es un ID válido').isMongoId(),
    //validar si existe el usuario por el ID
    check('id').custom( existeUsuarioPorId ),
    //validar el rol
    //aunque en esta validacion significaria que el rol siempre me lo deben de mandar
    check('rol').custom( esRolValido ),
    //llamamos el metodo para validar campos y mostrar los errores
    validarCampos
], usuariosPut);
//DELETE
router.delete('/:id',[
    // validar el JWT
    validarJWT,
    //este middleware debe  ir despues de validar el JWT para que se pueda generar el JWT y asi poder crear en el request el usuario y poder validar el ROLE
    // este rol fuerza a que el ROL tenga que ser si o si ADMIN_ROLE
    // esAdminRole,

    //creamos un middleware para ser un poco mas flexibles a la hora de definir los roles permitidos para borrar un registro
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    //verificar si el ID es un ID valido de MONGO con express validator
    check('id', 'No es un ID válido').isMongoId(),
    //validar si existe el usuario por el ID
    check('id').custom( existeUsuarioPorId ),
    //llamamos el metodo para validar campos y mostrar los errores
    validarCampos
], usuariosDelete);

//exportamos por default router
module.exports = router;