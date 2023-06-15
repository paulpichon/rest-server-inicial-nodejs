// funcion para generar JWT
// importar jsonwebtoken
const jwt = require('jsonwebtoken');

//Recordar que el paquete de JSONWEBTOKEN funciona con CALLBACKS
// uid = identificador unico de usuario/ user identifier
// podemos ponerlo asi uid = '' para que siempre sea un string
const generarJWT = ( uid = '' ) => {

    // esto funciona en base a una PROMESA
    return new Promise( (resolve, reject) => {

        //lo que vamos a grabar en el PAYLOAD, en este caso solo se grabara el UID
        // pero podria ser el nombre, correo, role etc, etc
        // pero por seguridad solo mandaremos el UID
        const payload = { uid };

        // INSTRUCCION PARA GENERAR UN JSON WEB TOKEN
        // .sign( payload, , opciones)
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            // en cuanto tiempo quiero que expire el JSONWEBTOKEN
            expiresIn: '4h'
        }, (err, token)  => {
            // en caso de que haya un error
            if ( err ) {
                console.log( err );
                reject('No se pudo generar el token')
            }else {
                // pero si no hay error, mandamos a llamar el RESOLVE mandandole el TOKEN
                resolve( token );
            }
        });

    });

}

// exports
module.exports = {
    generarJWT
}