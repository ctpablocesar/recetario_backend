const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getGaleria, crearGaleria, actualizarGaleria, eliminarGaleria} = require('../controllers/galeria');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getGaleria);

router.use(validarJWT);

router.post('/',
    [
        check('titulo', 'Titulo de la imagen es obligatorio').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        validarCampos
    ]
    , crearGaleria);

router.put('/:id', actualizarGaleria);

router.delete('/:id', eliminarGaleria);

module.exports = router;