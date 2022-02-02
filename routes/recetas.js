const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getRecetas, crearReceta, actualizarReceta, eliminarReceta, getRecetasPorUsuario, getRecetaPorId, getRecetasPorContenido, getRecetasPorTiempo, getRecetasPorTitulo, getRecetasPorTipo } = require('../controllers/recetas');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.get('/', getRecetas);

router.get('/receta/:id', getRecetaPorId);

router.get('/contenido/:contenido', getRecetasPorContenido);

router.get('/tiempo/:tiempo', getRecetasPorTiempo);

router.get('/tipo/:tipo', getRecetasPorTipo);

router.get('/titulo/:titulo', getRecetasPorTitulo);

router.use(validarJWT);

router.get('/recetasPorUsuario/:id', getRecetasPorUsuario);

router.post('/',
    [
        check('titulo', 'El titulo de la receta es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion de la receta es obligatoria').not().isEmpty(),
        check('ingredientes', 'Los ingredientes de la receta son obligatorios').not().isEmpty(),
        check('tiempo', 'El tiempo de la receta es obligatorio').not().isEmpty(),
        check('procedimiento', 'El procedimiento de la receta es obligatorio').not().isEmpty(),
        check('ocacion', 'La ocacion de la receta es obligatoria').not().isEmpty(),
        check('uid', 'El uid de la receta es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , crearReceta);

router.put('/:id', actualizarReceta);

router.delete('/:id/:uid', eliminarReceta);

module.exports = router;