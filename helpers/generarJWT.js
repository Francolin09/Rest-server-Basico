const jwt = require('jsonwebtoken')//25 importamos el paquete de jwt


const generarJWT = ( uid = '') => { //26 creamos esta funcion, hasta el paso 26 tenemos la funcion vacía//28 aqui debe venir un uid


    return new Promise ( (resolve, reject ) => {//27 ahora bien yo necesito que esta funcion trabaje como promesa porque en el archivo auth.js la puse con un await porque obvia po, por ese motivo el retorno será una promesa

        const payload = {uid}//29 definimos que en el payload del jwt guardaremos el uid, nada mas porque se lo pueden robar
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{ //30 el metodo sign pide el payload y el secretorPrivatekey, que lo iremos a crear a las variables de entorno
            expiresIn:'5h' //31 tambien podemos pasarle opciones como cuando queremos que expire etc 
        },(err, token) => {//32 el ultimo parametro es un callback donde viene el error o el token
            if(err){ //33 aca hacemos la validacion que si viene el error caga y si viene el token todo bien
                console.log(err);
                reject('No se pudo generar el token, tontito')
            }else {
                resolve(token);
            }

        }) 
    } )
} //34 ahora vamos al auth a importar este metodo y ver que onda 


module.exports = {
    generarJWT
}