const {response} = require('express')

//acá el res no existe por tanto desestructuramos response y decimos que res = response
//para que asi adquiera sus propiedades y toda esa mierda
// const usuariosGet = (req, res = response) =>{ 
//     res.json({
//         msg:'Get APi - controlador'
//     })
// }

const usuariosGet = (req, res = response) =>{ 
    const query = req.query; //Esta propiedad al ser opcional no es necesaria declararla en la ruta del metodo get 
    res.json({
        msg:'Get APi - controlador',
        query
    })
}

// const usuariosPost = (req, res = response) =>{ 
//     res.json({
//         msg:'Post APi - controlador'
//     })
// } este es el base pero ahora haremos lo mismo rescatando el body que venga

const usuariosPost = (req, res = response) =>{ 
    const body = req.body;
    res.json({
        msg:'Post APi - controlador',
        body
    })
}

// const usuariosPut = (req, res = response) =>{ 
//     res.json({
//         msg:'Put APi - controlador'
//     })
// }

const usuariosPut = (req, res = response) =>{ 
    const id = req.params.id;              //Para que este id funcione hay que cambiar el método en las rutas, anda pa alla a ver
    res.json({
        msg:'Put APi - controlador',
        id
    })
}

const usuariosDelete = (req, res = response) =>{ 
    res.json({
        msg:'Delete APi - controlador'
    })
}

module.exports = { usuariosGet,usuariosPost,usuariosPut,usuariosDelete }