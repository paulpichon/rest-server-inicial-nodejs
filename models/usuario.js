//necesitamos extraer el Schema y el model de mongoose
const { Schema, model } = require('mongoose');

//creamos una constante con un objeto literal
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        //true/false, si es requerido y el mensaje de error
        required: [ true,  'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//exports
//la funcion model() de mongoose --> solicita el nombre del modelo para poner el nombre a la misma coleccion/tabla y como segundo parametro el nombre del Schema
//mongoose por defecto le agregara una 'S', Usuario = Usuarios
module.exports = model('Usuario', UsuarioSchema);