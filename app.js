//express
const express = require('express');
//dotenv
require('dotenv').config();
//constante de express
const app = express();
//puerto
//en caso de no estar definido PORT entonces usar el puerto
const port = process.env.PORT || 3000;

//ruta
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//listen al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});