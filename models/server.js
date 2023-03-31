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
        //GET
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'GET API'
            });
        });
        //POST
        this.app.post('/api', (req, res) => {
            res.json({
                msg: 'POST API'
            });
        });
        //PUT
        this.app.put('/api', (req, res) => {
            res.json({
                msg: 'PUT API'
            });
        });
        //DELETE
        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'DELETE API'
            });
        });
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