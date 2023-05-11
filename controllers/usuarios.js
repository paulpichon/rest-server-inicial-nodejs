//importamos reponse de express para ayudarnos con el tipado
const { response, request } = require("express");
//encriptar la contraseña
const bcryptjs = require('bcryptjs');
//importamos nuestro Schema Usuario 
//ponemos la U mayuscula de Usuario porque es un estandar que me va a permitir crear instancias de mi modelo
const Usuario = require('../models/usuario');


//GET
const usuariosGet = async (req = request, res = response) => {
    //desestructurar de los argumentos que vienen en el request body
    //en caso que no venga un valor en limite por defecto sera de 5
    //un segundo argumento que podemos mandar es el desde: es decir desde donde va a empezar los registros, lo ponemos por defecto como 0
    const { limite = 5, desde = 0 } = req.query;

    //GET de todos los usuarios
    const usuarios  = await Usuario.find()
        //.skip() nos muestra los registros desde donde nosotros lo mandemos
        .skip( desde )
        //paginar los resultados
        //.limit("numero de resultados que nos mostrara"), en este caso lo pasamos como argumento pero debemos castearlo para que no marque error, lo casteamos con Number()
        //ACTUALIZACION
        //En versiones anteriores quiza era necesario castear el argumento si no era estrictamente un numero pero ahora no es necesario, Number( limite )
        .limit( limite );

    res.json({
        usuarios
    });
}
//POST
const usuariosPost = async(req, res = response) => {

    //body
    const { nombre, correo, password, rol } = req.body;
    //creamos una nuesva instancia de Usuario
    //y es por ello que lleva U mayuscula Usuario
    //y mandamos como argumento el body
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptar la contraseña
    //por defecto esta en 10 = genSaltSync(10) = genSaltSync()
    //salt
    const salt = bcryptjs.genSaltSync();
    //hash
    //hashSync( password, salt), como primer argumento espera el string que vamos a encriptar en este caso es el PASSWORD y como segundo parametro es el SALT
    usuario.password = bcryptjs.hashSync( password, salt);

    //Grabar el registro en la coleccion
    await usuario.save();
    //se puede mandar solo el objeto sin llaves
    res.json( usuario );
}
//PUT
const usuariosPut = async(req, res = response) => {

    //id desde la URL
    const { id } = req.params;
    //desestructurar de la request.body
    //tambien extraemos el _ID si es que viene
    const { _id, password, google, correo, ...resto } = req.body;
    //validar contra la base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }
    //actualizar registro
    //.findByIdAndUpdate('id del registro que se va actualizar', 'informacion a actualizar')
    //con {new: true} actualizamos el modelo que retorna
    //{ new: true }, es equivalente a returnOriginal: false
    const usuario = await Usuario.findByIdAndUpdate( id, resto, {
        // returnOriginal: false
        //actualiza el modelo(retorna el modelo actualizado que vemos como consulta)
        new: true
    });

    res.json( usuario );
}
//DELETE
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - Controller'
    });
}
//exports
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}