//express
const express = require('express');
//cors
const cors = require('cors');

// clase Server
class Server {
    //constructor
    constructor() {
        //constante de express
        this.app = express();
        //puerto
        //en caso de no estar definido PORT entonces usar el puerto 3000
        this.port = process.env.PORT || 3000;
        //cors
        this.app.use(cors());
        //ruta principal de la API
        this.usuariosPath = '/api/usuarios';


        //middlewares
        this.middlewares();
        //Routes
        this.routes();
    }
    //middlewares
    middlewares() {
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