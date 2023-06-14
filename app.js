const Server = require('./models/server');

require('dotenv').config();

// const express = require('express');
// const app = express();

// app.get('/', function(req,res){
//     res.send('MENSAJEEEEEE')
// })

// app.listen(process.env.PORT)

//Esto mismo se puede hacer en base a clases para eso crearemos la carpeta models
//Creando el servidor en el archivo server en una clase, aca solo los llamamos y queda mas limpio

const server = new Server();

server.listen()