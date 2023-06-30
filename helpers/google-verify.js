
//16 copiamos y pegamos el codigo que entrega google haciendo algunos cambios como las variables de entorno

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleVerify(token = '') {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
   //   const payload = ticket.getPayload();
  const {name, picture, email} = ticket.getPayload(); //21 en tonces en vez de usar solo payload desestructuraremos para tener lo que queremos
  //console.log(payload) entonces como este ya no existe lo comentamos
  return { // 20 aca haremos retorno de solo la informacion que queremos no de toda esa mierda que devuelve el console.log

    nombre:name,
    img:picture,
    correo:email }
}


module.exports = { googleVerify} //17 Para hacer uso de este validador lo pondremos en el metodo googleSignIn