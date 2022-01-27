const { response } = require("express");
const Anuncio = require('../models/Anuncio');

const getAnuncios = async (req, res = response) => {

    const anuncios = await Anuncio.find()

    res.json({
        ok: true,
        anuncios
    })

}

const crearAnuncio = async (req, res = response) => {

    const anuncio = new Anuncio(req.body);

    try {

        const anuncioGuardado = await anuncio.save()

        res.json({
            ok: true,
            anuncio: anuncioGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarAnuncio = async (req, res = response) => {

    const anuncioId = req.params.id;

    try {

        const anuncio = await Anuncio.findById(anuncioId);

        if (!anuncio) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no existe por id'
            })
        }

        const nuevoAnuncio = {
            ...req.body,
            'fecha': (Date.now())
        }

        const anuncioActualizado = await Anuncio.findByIdAndUpdate(anuncioId, nuevoAnuncio, { new: true });

        res.json({
            ok: true,
            anuncioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

const eliminarAnuncio = async (req, res = response) => {

    const anuncioId = req.params.id;

    try {

        const anuncio = await Anuncio.findById(anuncioId);

        if (!anuncio) {
            return res.status(404).json({
                ok: false,
                msg: 'Anuncio no existe por id'
            })
        }

        const anuncioActualizado = await Anuncio.findByIdAndDelete(anuncioId);

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
    getAnuncios,
    crearAnuncio,
    actualizarAnuncio,
    eliminarAnuncio,
}