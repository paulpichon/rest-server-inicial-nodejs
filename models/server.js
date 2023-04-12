//express
const express = require('express');
//cors
const cors = require('cors');
//importamos la conexion a la BD
const { dbConnection } = require('../database/config');

// clase Server
class Server {
    //constructor
    constructor() {
        //constante de express
        this.app = express();
        //puerto
        //en caso de no estar definido PORT entonces usar el puerto 3000
        this.port = process.env.PORT || 3000;
        //ruta principal de la API
        this.usuariosPath = '/api/usuarios';

        //conectar a la base de datos
        this.conectarDB();
        //middlewares
        this.middlewares();
        //Routes
        this.routes();
    }
    //conexion a la base de datos, con metodo asincrono
    async conectarDB() {
        //llamamos la conexion con el await, ya que debemos esperar a que se ejecute la conexion
        await dbConnection();
    }

    //middlewares
    middlewares() {
        //cors
        this.app.use(cors());
        //lectura y parsear del body
        this.app.use( express.json() );
        //Archivo público
        this.app.use( express.static('public') );
    }

    //metodos
    
    //rutas
    routes() {
        //cargar el modulo de direccionador
        this.app.use( this.usuariosPath, require('../routes/usuarios') );
    }

    //Listen
    listen() {
        //listen al puerto
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

//exports
module.exports = Server;