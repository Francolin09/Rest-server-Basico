const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();

        this.middlewares();

        this.routes()
    }

    middlewares(){
        this.app.use( express.static('public')) //aqui le asignamos el directorio publico
        //Al hacer uso de coso, este reemplaza la ruta origen es decir / 

        this.app.use(cors())

        //Parseo y lectura del body en la peticion
        this.app.use(express.json()) //Con esto todo lo que reciba en una peticion lo parseara a un json
    }

    routes(){

        // this.app.get('/api', (req, res) =>{ //para que no se pierda esta ruta la cambiaremos por /api
        //     res.send('Holi') //ya no usaremos el send porque envia como la pag completa y necesitamos enviar cosas en particular como mensajes en json

        // })
        
        // Todo esto de abajo se va a mover a rutas.js 

        // this.app.get('/api', (req, res) =>{ 
        //     res.json({
        //         msg:'Get APi'
        //     })
        // })

        // this.app.put('/api', (req, res) =>{ 
        //     res.json({
        //         msg:'Put API'
        //     })
        // })

        // this.app.post('/api', (req, res) =>{ 
        //     res.json({
        //         msg: 'Post API'
        //     })
        // })

        // this.app.delete('/api', (req, res) =>{ 
        //     res.json({
        //         msg:'Delete API'
        //     })
        // })

        this.app.use('/api/usuarios', require('../routes/rutas')) //aca estamos haciendo uso del middleware de las routas
        //lo que hace es primero se le define cual será la ruta y despues se le indica donde buscara el contenido
    }

    listen(){
        this.app.listen(process.env.PORT, ()=>{
            console.log('Servidor corriendo piiiiuuuuuuum en el puerto', process.env.PORT)
        })
    }
}

module.exports = Server;