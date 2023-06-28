const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')//54 primero importamos el modelo de usuario

//40 creamos la funcion que será nuestro middleware y exportemosla altiro para que no se nos olvide 
const validarJWT = async (req = request, res = response, next) =>{ //41 le pasamos los parametros de un middleware

    const token = req.header('x-token') //42 de esta forma es que recuperaremos el token que venga en el header y le indicamos el nombre que trae el token en este caso x-token
    if(!token){ //45 aca validaremos si viene o no el  token

        return res.status(401).json({
            msg:'No hay token en la petición, te vas a la chucha'
        })
    }

    try { //46 aca validaremos si es un token valido o invalido

        // jwt.verify(token, process.env.SECRETORPRIVATEKEY) //47 este es el metodo para verificar
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY) //48 no entendi muy bien pero sacaremos el id 
        //req.uid=uid; //49 al id que viene en la request le daremos el id del jwt //56 se borra este porque al final usaremos al usuario
        //50 le vamos a pasar este uid al controlador del delete
        //50.5 ya entendi, es para mostrar tambien el id de la persona que esta haciendo la solicitud po.
        const usuario = await Usuario.findById(uid) //55ya primero acuerdate que si es await hay que poner el async
       
        if(!usuario){//63 aca validamos si existe el usuario, ya que puede enviar un token valido pero no existir 
            return res.status(401).json({
                msg:'Token no valido- usuario no existe '
            })
        }
        //64Ahora necesitamos un validador de rol para que solo ciertos usuarios puedan borrar
        //Entonces nos creamos otro middleware llamado validarroles


        if(!usuario.estado){ //61 validamos si esta activo o no, si no, tira el error
        return res.status(401).json({
            msg:'Token no valido - usuario con estado false'
        })
       }

        req.usuario = usuario;//57 al final asignamos esto asi ahora nos vamos pal controlador del delete


        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido, te vas a la mierda'
        })
        
    }
    console.log(token);//42.5 este es para probar no mas que se este recibiendo el token
     //43 para hacer uso de este hay que ir a importarlo a las rutas y ponerlo en el metodo que queremos en este caso delete

}










module.exports={
    validarJWT
}