const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getCalendario, crearCalendario, actualizarCalendario} = require('../controllers/calendario');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getCalendario);

router.use(validarJWT);

router.post('/',
    [
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        validarCampos
    ]
    , crearCalendario);

router.put('/:id', actualizarCalendario);

module.exports = router;