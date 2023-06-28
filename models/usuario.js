
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio maldita sea']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio maldita sea'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria maldita sea'],
        
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required: true,
        emun:['ADMIN_ROL','USER_ROL'] //ESTO LE DICE QUE PUEDE SER UNO O EL OTRO
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario} = this.toObject(); //37 aca el tio quiere que ya no se vea el _id, que aparezca como uid pero sin cambiarle el nombre en la bd, para eso desestructuramos el _id
    usuario.uid = _id; //38 entonces aqui agregamos a usuario una propiedad llamada uid que tendrá el mismo valor del id y esa si se mostrará, listo listón
    return usuario;
}
//39 ya hasta este punto tenemos todo bien pero ahora debemos implementar este jwt para las rutas especificamente para el delete
//Entonces si yo quiero proteger una ruta debo hacer un middleware asi que crearemos el middelware llamado validarjwt




module.exports = model('Usuario', UsuarioSchema)
