const {Router} = require('express'); //4 importamos lo que vamos a necesitar
const {check} = require('express-validator');
const { usuariosGet } = require('../controllers/rutas');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio, tontito').isEmail(), //10 creamos los middlewares, acuerdate que 
    check('password', 'La contraseña es obligatoria, tontito').not().isEmpty(),//para que funcionen hay poner el validarCampos
    validarCampos
] ,login ) //4.5y tomamos un metodo para probarlo // 8 aca lo llamamos //9 anda a probar esta ruta a postman, corre
//5 teniendo esto nos vamos a crear el controlador de auth


module.exports = router;