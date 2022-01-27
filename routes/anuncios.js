const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getAnuncios, crearAnuncio, actualizarAnuncio, eliminarAnuncio } = require('../controllers/anuncios');
const { check } = require('express-validator');

const router = Router();

router.get('/', getAnuncios);

router.use(validarJWT);

router.post('/',
    [
        check('titulo', 'Titulo del anuncio es obligatorio').not().isEmpty(),
        check('descripcion', 'Descripción del anuncio es obligatoria').not().isEmpty(),
        check('imagen', 'La imagen es obligatoria').not().isEmpty(),
        check('tituloImagen', 'El titulo de la imagen es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearAnuncio);

router.put('/:id', actualizarAnuncio);

router.delete('/:id', eliminarAnuncio);

module.exports = router;