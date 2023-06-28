const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => { //El custom hace una verificacion personalizada
    const existeRol = await Role.findOne({ rol: rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la bd`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail =await Usuario.findOne({ correo: correo }); //aca decimos que si hay un correo con el mismo que estamos agregando tirará error, tambien recordar importar elmodelo de Usuario
    if (existeEmail) {
       throw new Error(`El correo ${correo} ya está registrado, tontito`)
    }
}  //una vez creado aca la validacion debemos actualizarlo en las routes y en el metodo que corresponda


const existeUsuarioPorId = async (id) => {             //ojo, en la linea de abajo no deja poner {id:id} hay que ponerlo de la forma resimida(id)
    const existeUsuario = await Usuario.findById( id); //aca decimos que si hay un id con el mismo que estamos agregando tirará error, tambien recordar importar elmodelo de Usuario
    if (!existeUsuario) {
       throw new Error(`El id ${id} no existe en la base de datos, tontito`)
    }
}  


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}