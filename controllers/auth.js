const { response } = require("express");
const Usuario = require('../models/usuario')//15 para analizar el email tenemos que llamar el modelo de usuario
const bcryptjs = require('bcryptjs'); //20 importamos este para las contraseñas
const { generarJWT } = require("../helpers/generarJWT"); //35 se importa este metodo que hemos creado hehe
const login = async (req, res = response) => { //6 creamos esta funcion de login porque acuerdate que los controladores no son nada mas que una funcion
    
    const {correo, password} = req.body; //11 aqui sabemos que tendremos esos dos elementos porque nuestras validaciones no permiten pasar si no estan
    
    try {

        //14 Verificar si el email existe
        const usuario = await Usuario.findOne({correo}); //16 creamos una constante usuario que verificará si existe un correo igual al que mandamos,
        if (!usuario){//17 validamos si es que no existe devuelve un mensaje de error
            return res.status(400).json({
                msg:'Usuario o password incorrectos, tontito (fue el correo)'
            })
        }
        //18 validamos si el usuario está activo
        if(!usuario.estado){ //19 aqui evaluamos y si el estado es false tira error y envia el mensaje sin dejar pasar
            return res.status(400).json({
               msg:'Usuario o password no son correctos - se borro este usuario tonto'
            })
        }
        //19 Validacion de la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);//21 esta funcion va a comparar la contraseña que viene en el body con la de la bd
        if(!validPassword){ //22 evaluamos si es password no es el mismo y tira mensaje de error amigable
            return res.status(400).json({
                msg:'Usuario o password no son correctos - password incorrecto, tontito'
            })
        }
        //23 generar JWT (primero instalar el paquete npm i jsonwebtoken)
        const token = await generarJWT(usuario.id) //24 esta es la forma que quiero que funcione pero hay que crear este metodo en los helpers entonces creamos el archivo generarJWT.js


        res.json({
            msg:'Login okeys',
            usuario,
            token  //36 ahora le pasamos el usuario y el token que generamos a la respuesta del metodo y probamos
        })
        
    } catch (error) {
        console.log(error) //12 ponemos este try catch y definimos el error pero nunca deberiamos verlo, JAMÁS
        return res.status(500).json({
            msg:'No sé na yo, hable con el admin que esto sae cayó'
        })
        
    }
    // res.json({
    //     msg:'Login okeys' //13 este que solía estar aca lo cambiamos dentro del try
    // })
}                                       //7 una vez creado lo llamamos en el auth route 

module.exports={
    login
}