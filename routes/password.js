const { Router } = require('express');
const { check } = require('express-validator');

const { ForgotPassword, ResetPassword } = require('../controllers/password');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('correo', 'El correo es obligatorio en la petición').isEmail(),
    validarCampos
], ForgotPassword);

router.post('/reset', [
    check('token', 'El token es obligatorio en la petición').not().isEmpty(),
    check('password', 'La contraseña debe de ser de minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], ResetPassword);

module.exports = router;