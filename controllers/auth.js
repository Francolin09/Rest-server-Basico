const { response } = require("express");
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs'); 
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");
const login = async (req, res = response) => { 
    
    const {correo, password} = req.body; 
    
    try {

        
        const usuario = await Usuario.findOne({correo}); 
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario o password incorrectos, tontito (fue el correo)'
            })
        }
       
        if(!usuario.estado){ 
            return res.status(400).json({
               msg:'Usuario o password no son correctos - se borro este usuario tonto'
            })
        }
        
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){ 
            return res.status(400).json({
                msg:'Usuario o password no son correctos - password incorrecto, tontito'
            })
        }
        
        const token = await generarJWT(usuario.id) 


        res.json({
            msg:'Login okeys',
            usuario,
            token  
        })
        
    } catch (error) {
        console.log(error) 
        return res.status(500).json({
            msg:'No sé na yo, hable con el admin que esto sae cayó'
        })
        
    }
   
}     

//6 creamos el controlador de google signin
const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body; //7 sabemos que debe traer el id_token asi que lo desestructuramos y lo devolvemos en la response
    
    try { //18 lo pondremos aca dentro de un try catch porque podria venir un token malo feo o que no sirva
        // const googleUser = await googleVerify( id_token);
        const {correo, nombre, img} = await googleVerify( id_token);//23 este lo podemos desestructurar igual para sacar lo que necesitamos

        let usuario = await Usuario.findOne({correo}); //24 buscamos si existe usuario con el correo del usuario que viene
        //25 se define con un let para que podamos modificarlo segun la validacion
        
        if(!usuario){
            const data = { //26 si el usuario no existe guardaremos los datos del usuario que viene en data
                nombre,
                correo,
                password:'xd',
                img,
                google:true
            };

            usuario = new Usuario(data) //27 modificamos el usuario definido arriba con el let y le pasamos la propiedades guardadas en data
            await usuario.save()//28 finalmente guardamos al uisuario en la base
        };

        if(!usuario.estado){ //29 aca validamos que si el usuario existente tiene su estado en false se va cagando y no lo dejamos pasar
            return res.status(401).json({
                msg:'Usuario bloqueado, malandrin, sucio, delincuente o eliminado hehe'
            })
        }

        const token = await generarJWT(usuario.id); //30 generamos un token al usuario 

        


        //console.log(googleUser) //22 entonces aca mostraremos el google user que viene del google verify 

        res.json({ //19 ponemos la respuesta dentro del try tambien
            msg:'Todo bien y bonito, aquí está su token mi rey',
            usuario,
            //id_token,//31 ahora en vez de mandar id_token, mandamos el token
            token,
            
        })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'No se verifico el token, te vas a la chucha'
        })
        
    }
   
}

module.exports={
    login,
    googleSignIn //8 y exportamos 
}