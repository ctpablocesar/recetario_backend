const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getContacto, crearContacto, actualizarContacto, eliminarContacto } = require('../controllers/contacto');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getContacto);


router.post('/',
    [
        check('nombre', 'Nombre del Contacto es obligatorio').not().isEmpty(),
        check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
        check('asunto', 'El asunto del correo es obligatorio').not().isEmpty(),
        check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearContacto);

router.use(validarJWT);

router.put('/:id', actualizarContacto);

router.delete('/:id', eliminarContacto);

module.exports = router;