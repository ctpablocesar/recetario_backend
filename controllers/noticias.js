const { response } = require("express");
const Noticia = require('../models/Noticias');
const moment = require('moment');
require('moment/locale/es-mx');

const getNoticias = async (req, res = response) => {

    const noticias = await Noticia.find()

    res.json({
        ok: true,
        noticias
    })

}

const crearNoticia = async (req, res = response) => {

    const noticia = new Noticia(req.body);

    try {

        const noticiaGuardada = await noticia.save()

        res.json({
            ok: true,
            noticia: noticiaGuardada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarNoticia = async (req, res = response) => {

    const NoticiaId = req.params.id;

    try {

        const noticia = await Noticia.findById(NoticiaId);

        if (!noticia) {
            return res.status(404).json({
                ok: false,
                msg: 'Noticia no existe por id'
            })
        }

        const nuevaNoticia = {
            ...req.body,
            'fecha': (Date.now())
        }

        const noticiaActualizada = await Noticia.findByIdAndUpdate(NoticiaId, nuevaNoticia, { new: true });

        res.json({
            ok: true,
            noticiaActualizada: noticiaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

const eliminarNoticia = async (req, res = response) => {

    const noticiaId = req.params.id;

    try {

        const noticia = await Noticia.findById(noticiaId);

        if (!noticia) {
            return res.status(404).json({
                ok: false,
                msg: 'Noticia no existe por id'
            })
        }

        const noticiaActualizada = await Noticia.findByIdAndDelete(noticiaId);

        res.json({ ok: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }
}


module.exports = {
    getNoticias,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia,
}