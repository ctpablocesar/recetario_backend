const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { enviarCorreo } = require('../controllers/correos');
const { check } = require('express-validator');

const router = Router();

router.use(validarJWT);

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('asunto', 'El asunto del correo es obligatorio').not().isEmpty(),
        check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , enviarCorreo);

module.exports = router;