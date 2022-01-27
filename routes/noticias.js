const { Router, response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getNoticias, crearNoticia, actualizarNoticia, eliminarNoticia} = require('../controllers/noticias');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getNoticias);

router.use(validarJWT);

router.post('/',
    [
        check('titulo', 'Titulo de la noticia es obligatorio').not().isEmpty(),
        check('descripcion', 'Descripción de la noticia es obligatoria').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        check('tituloImagen', 'El titulo de la imagen es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearNoticia);

router.put('/:id', actualizarNoticia);

router.delete('/:id', eliminarNoticia);

module.exports = router;