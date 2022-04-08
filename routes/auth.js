/*
    Rutas de usuarios /Auth
    host + /api/auth
*/

const { Router, response } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario, loginUsuario, revalidarToken, crearAdmin, cerrarSesion } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isRole } = require('../helpers/isRole');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').custom(isRole),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de minimo 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'El email no es valido').isEmail(),
        check('password', 'El passwor debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

router.use(validarJWT);

router.get('/logout', cerrarSesion);

router.post(
    '/newAdmin',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('rol', 'El rol es obligatorio').custom(isRole),
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de ser de minimo 6 caracteres').isLength({ min: 6 }),
        check('uid', 'El uid es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAdmin);

module.exports = router;