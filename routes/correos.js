const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { enviarCorreo, enviarCorreoTodos, enviarCorreoVarios } = require('../controllers/correos');
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

router.post('/todos',
    [
        check('asunto', 'El asunto del correo es obligatorio').not().isEmpty(),
        check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , enviarCorreoTodos);

router.post('/varios',
    [
        check('emails', 'El correo es obligatorio').not().isEmpty(),
        check('asunto', 'El asunto del correo es obligatorio').not().isEmpty(),
        check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , enviarCorreoVarios);

module.exports = router;