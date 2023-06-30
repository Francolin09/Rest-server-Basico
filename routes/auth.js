const {Router} = require('express'); 
const {check} = require('express-validator');
const { usuariosGet } = require('../controllers/rutas');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio, tontito').isEmail(), 
    check('password', 'La contraseña es obligatoria, tontito').not().isEmpty(),
    validarCampos
] ,login ) 

//4 creamos un nueva ruta para gogle
router.post('/google',[
    check('id_token','El id de google es obligatorio, tontito').not().isEmpty(), //5 dejamos solo un campo que sera la validacion de si viene algo o no, ahora hay que ir a crear el controlador
    
    validarCampos
] ,googleSignIn ) //9 agregamos el controlador acá 
                  //10 ahora bien esto es solo un ejercicio simulando un token, pero ahora iremos al html para manejar el token que de verdad estamos recibiendo

module.exports = router;