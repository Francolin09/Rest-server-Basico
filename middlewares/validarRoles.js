const { request, response } = require("express");


const esAdminRol = (req= request, res= response, next)=>{ //65 creamos la funcion y le pasamos los parametros de un middleware, ademas recordar exportar

    if(!req.usuario){ //66 validamos si es que el usuario viene bien con su validacion de token
        return res.status(500).json({ //Este error pasaria si ponemos este middleware antes que los demas
            msg:'Se quiere verificar el rol sin validar el token y eso no se hace, tonto'
        })
    }

    const {rol, nombre} = req.usuario; //67 desestructuramos rol y nombre de la request

    if(rol !=='ADMIN_ROL'){
        return res.status(401).json({
            msg:`Tú no eres administrador, anda a laar, no puedes borrar gente`
        })
    }
    //68 ya hecho todo esto vamos a ponerlo en las rutas



    next()
}
//70 crearemos una validacion un poco mas flexible
const tieneRol =(...roles)=>{ 71//en este middleware lo que necesitamos es tener todos los roles que definamos en la ruta, para eso usamos el operador rest y le ponemos roles, entonces todo lo que pongamos se guardara en un arreglo llamado roles


//72 si dejamos esto asi no funciona porque Route.delete requiere de una funcion y con esto asi no le pasamos una funcion asi que hayq ue retornar una funcion

return (req,res=response, next) => {
    if(!req.usuario){ //73 validamos que se corra despues de recibir un token
        return res.status(500).json({
            msg:'Se requiere validar el token primero, estúpido'
        })
    }

    if(!roles.includes(req.usuario.rol)){ //74 validamos que el rol que trae el usuario este dentro de los roles difnidos en las rutas y listo, shao pescao terminamos 
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        })
    }


    next();
 }
    
}



module.exports = {
    esAdminRol,
    tieneRol
}