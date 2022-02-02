const { response } = require("express");
const Receta = require('../models/Receta');
const Usuario = require('../models/Usuario');
const moment = require('moment');
require('moment/locale/es-mx');

const getRecetas = async (req, res = response) => {

    const recetas = await Receta.find().sort({ fecha: -1 });

    res.json({
        ok: true,
        recetas
    })

}

const crearReceta = async (req, res = response) => {

    const receta = new Receta(req.body);

    try {

        const recetaGuardada = await receta.save()

        res.json({
            ok: true,
            recetaGuardada
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarReceta = async (req, res = response) => {

    const recetaId = req.params.id;
    const uid = req.body.uid;
    const user = await Usuario.findById(uid);

    if (!!user) {

        if (user.rol === 'admin') {

            try {

                const receta = await Receta.findById(recetaId);

                if (!receta) {
                    console.log("estoy en la 51");
                    return res.status(404).json({
                        ok: false,
                        msg: 'Receta no existente'
                    })
                }

                const nuevaReceta = {
                    ...req.body,
                    'fecha': (Date.now())
                }

                const RecetaActualizada = await Receta.findByIdAndUpdate(recetaId, nuevaReceta, { new: true });

                res.json({
                    ok: true,
                    RecetaActualizada
                })

            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor, hable con el administrador'
                })
            }
        } else {
            res.status(403).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            })
        }

    } else {

        try {

            const receta = await Receta.findById(recetaId);

            if (!receta) {
                if (receta.uid === uid) {

                    const nuevaReceta = {
                        ...req.body,
                        'fecha': (Date.now())
                    }

                    const RecetaActualizada = await Receta.findByIdAndUpdate(recetaId, nuevaReceta, { new: true });

                    res.json({
                        ok: true,
                        RecetaActualizada
                    })

                } else {
                    return res.status(403).json({
                        ok: false,
                        msg: 'No tienes los permisos para modificar esta receta'
                    })
                }
            } else {
                console.log("estoy en la 5104");
                return res.status(404).json({
                    ok: false,
                    msg: 'Receta no existente'
                })
            }

        } catch {

            res.status(500).json({
                ok: false,
                msg: 'Por favor, hable con el administrador'
            })

        }

    }


}

const eliminarReceta = async (req, res = response) => {

    const recetaId = req.params.id;

    const uid = req.params.uid;

    const user = await Usuario.findById(uid);

    if (!!user) {

        if (user.rol === 'admin') {
            try {

                const receta = await Receta.findByIdAndDelete(recetaId);

                if (!receta) {
                    return res.status(404).json({
                        ok: false,
                        msg: 'Receta no existente'
                    })
                }

                res.json({
                    ok: true,
                    msg: 'Receta eliminada'
                })

            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor, hable con el administrador'
                })
            }
        } else {
            res.status(403).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            })
        }
    } else {
        try {

            const receta = await Receta.findById(recetaId);

            if (!receta) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Receta no existente'
                })
            }

            if (receta.uid === uid) {

                const recetaEliminada = await Receta.findByIdAndDelete(recetaId);

                res.json({
                    ok: true,
                    msg: 'Receta eliminada'
                })

            } else {
                return res.status(403).json({
                    ok: false,
                    msg: 'No tienes los permisos para eliminar esta receta'
                })
            }

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Por favor, hable con el administrador'
            })
        }
    }


}

const getRecetasPorUsuario = async (req, res = response) => {

    const usuarioId = req.params.id;

    try {

        const recetas = await Receta.find({ uid: usuarioId });

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}


const getRecetaPorId = async (req, res = response) => {

    const recetaId = req.params.id;

    try {

        const receta = await Receta.findById(recetaId);

        res.json({
            ok: true,
            receta
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}

const getRecetasPorContenido = async (req, res = response) => {

    const contenido = req.params.contenido;

    try {

        const recetas = await Receta.find({ descripcion: { $regex: contenido, $options: 'i' } });

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}

const getRecetasPorTitulo = async (req, res = response) => {

    const titulo = req.params.titulo;

    try {

        const recetas = await Receta.find({ titulo: titulo });

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}

const getRecetasPorTiempo = async (req, res = response) => {

    const tiempo = req.params.tiempo;

    try {

        const recetas = await Receta.find({ tiempo: tiempo });

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}

const getRecetasPorTipo = async (req, res = response) => {

    const tipo = req.params.tipo;

    try {

        const recetas = await Receta.find({ ocacion: tipo });

        res.json({
            ok: true,
            recetas
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }


}



module.exports = {
    getRecetas,
    crearReceta,
    actualizarReceta,
    eliminarReceta,
    getRecetasPorUsuario,
    getRecetaPorId,
    getRecetasPorContenido,
    getRecetasPorTiempo,
    getRecetasPorTitulo,
    getRecetasPorTipo
}