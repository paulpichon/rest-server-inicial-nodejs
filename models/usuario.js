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
    google: {
        type: String,
        default: false
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//toObject() ---> This method returns a cloned, vanilla object.
//esto hara que no se muestre tanto la __v como el password en pantalla cuando se haga un POST
//sobreecribir metodo TOJSON
//debe ser una funcion normal ya que haremos uso de la palabra reservada THIS
UsuarioSchema.methods.toJSON = function() {
    //desestructurar algo que viene this.toObject(), esto va agenerar una instancia con sus valores respectivos, como si fuera un objeto literal de JS
    //esto hara que __v y password no se muestren en el arreglo
    //mientras que el resto de las propiedades iran en ...usuario
    const { __v, password, _id, ...usuario } = this.toObject();
    //renombramos el _id por uid
    usuario.uid = _id;
    //y por ultimo retornamos el usuario(...usuario)
    return usuario;
}

//exports
//la funcion model() de mongoose --> solicita el nombre del modelo para poner el nombre a la misma coleccion/tabla y como segundo parametro el nombre del Schema
//mongoose por defecto le agregara una 'S', Usuario = Usuarios
module.exports = model('Usuario', UsuarioSchema);