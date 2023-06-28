const { response } = require('express')
const bcryptsjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async (req, res = response) => {
    const query = req.query; 
    const [total, usuarios] = await Promise.all([ 
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
         .skip(Number(desde))
         .limit(Number(limite)) 

    ])

    res.json({
        msg: 'Get APi - controlador',
        total,
        usuarios

    })
}

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //encriptar la contraseña
    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync(password, salt)

    //guardar en bd
    await usuario.save();
    res.json({
        msg: 'Post APi - controlador',
        usuario
    })
}



const usuariosPut = async (req, res = response) => {
    const { id } = req.params;             
    const { password, google, correo, _id, ...resto } = req.body; 
    
    if (password) {
        //encriptar la contraseña
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true })


    res.json({
        msg: 'Put APi - controlador',
        usuario

    })
}



const usuariosDelete = async(req, res = response) => {
    const {id} =req.params
    //Borrar fisicamente (No tan recomendado)
    // const usuario = await Usuario.findByIdAndDelete(id)

    //const uid = req.uid;//51 aca le asignamos el valor esto funciona porque todo viene como en cadena pero al final no era asi, asi que comentamos toda la mierda

    //Borrar pero de a mentiritas
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    const usuarioAutenticado = req.usuario; //58 entonces aqui asignamos al usuario completo que esta haciendo la request
    res.json({
        msg: 'Delete APi - controlador /Se ha borrado el siguiente usuario',
        usuario,
        //uid //52 y aca le tiramos el uid de nuevo pa que lo muestre
        //53 ahora VAMOS a querer obtener la info del usuario autenticado, para eso nos vamos a validarjwt
        usuarioAutenticado //59 y ahora a la respuesta le pasamos el usuario autenticado entonces nos muestra ambos usuarios
                           //60 ahora el paso siguiente es validar si el usuario esta activa y si lo está que pueda borrarse, sino, no, vamos al validarjwt
    })
}

module.exports = { usuariosGet, usuariosPost, usuariosPut, usuariosDelete }