//actualizacion
//schema para roles, que seran comparadas contra el request
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});
//exports
module.exports = model('Rol', RoleSchema);