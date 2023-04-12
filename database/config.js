//requerimos el paquete de mongoose
const mongoose = require('mongoose');

//funcion asincrona
const dbConnection = async() => {
    //usamos un try catch ya que al ser una conexion puede fallar la conexion
    try{

        //https://mongoosejs.com/docs/connections.html
        //conexion a mongoose con await para esperar que la conexion se haga, si esto falla sera atrapado por el catch, necesitamos el URL de la conexion que esta en el archivo .env
        await mongoose.connect( process.env.MONGODB_CNN );

        console.log("base de datos online");

    } catch( error ) {
        //ver el error que nos muestra, si es que hay algun error
        console.log(error);
        //si hay algun error en la conexion de la base de datos lanzamos un error
        //este es un error controlado, ya que nosotros lo veriamos en consola
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

//exports
module.exports = {
    dbConnection
}