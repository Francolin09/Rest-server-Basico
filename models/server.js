const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.authPath = '/api/auth'; //1 crearemos esta variable de mierda con una ruta

        this.conectarDB();

        this.middlewares();

        this.routes()
    }

    async conectarDB(){

        await dbConnection()
    }

    middlewares(){
        this.app.use( express.static('public'))
        this.app.use(cors())

        //Parseo y lectura del body en la peticion
        this.app.use(express.json()) 
    }

    routes(){

        

        this.app.use('/api/usuarios', require('../routes/rutas')) 
        this.app.use(this.authPath, require('../routes/auth'))//2 definimos aca la ruta que usaremos 
                                                              //3 creamos el archivo auth.js en routes 
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor corriendo piiiiuuuuuuum en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server;