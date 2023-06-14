
const {Router} = require('express');// aca se desestructura Router que viene dentro del paquete de express
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/rutas');

const router = Router();

//Pero aca app no existe asi que cambiamos el app por router que funciona igual y también le sacamos el this porque esta aqui mismo
//Y este que era asi:
// this.router.get('/api', (req, res) =>{ 
//     res.json({
//         msg:'Get APi'
//     })
// })

//Quedaría asi:
//Además ya que la ruta será definida cuando se use este archivo en el server
//No es necesario que esten aqui asi que las borramos quedando solamente como /

// router.get('/', (req, res) =>{ 
//     res.json({
//         msg:'Get APi'
//     })
// })

// router.put('/', (req, res) =>{ 
//     res.json({
//         msg:'Put API'
//     })
// })

// router.post('/', (req, res) =>{ 
//     res.json({
//         msg: 'Post API'
//     })
// })

// router.delete('/', (req, res) =>{ 
//     res.json({
//         msg:'Delete API'
//     })
// })
//Al probar esto asi, funciona igual que la vez anterior y sin tant codigo de rutas en el server
//Pero esta logica que esta dentro de cada metodo al parecer podría ir en otro lado, es una paja 
//pero más ordenado

router.get('/', usuariosGet) //Entonces aqui solo llamamos a la funcion que se definió en el archivo rutas de la carpeta controladores

router.post('/', usuariosPost) //Y hacemos lo mismo con lo demas metodos

router.put('/:id', usuariosPut) //Se le agregó el :id viste 

router.post('/', usuariosDelete)







module.exports = router;