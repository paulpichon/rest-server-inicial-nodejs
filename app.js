//importar la clase Server
const Server = require('./models/server');

//dotenv
require('dotenv').config();

//crear una instacia de la clase Server()
const server = new Server;
// llamamos el metodo por el cual escucha nuestra aplicacion
server.listen();

