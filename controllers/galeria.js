const { response } = require("express");
const Galeria = require('../models/Galeria');

const getGaleria = async (req, res = response) => {

    const galeria = await Galeria.find()

    res.json({
        ok: true,
        galeria
    })

}

const crearGaleria = async (req, res = response) => {

    const galeria = new Galeria(req.body);

    try {

        const galeriaGuardado = await galeria.save()

        res.json({
            ok: true,
            galeria: galeriaGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarGaleria = async (req, res = response) => {

    const galeriaId = req.params.id;

    try {

        const galeria = await Galeria.findById(galeriaId);

        if (!galeria) {
            return res.status(404).json({
                ok: false,
                msg: 'Galeria no existe por id'
            })
        }

        const nuevoGaleria = {
            ...req.body,
            'fecha': (Date.now())
        }

        const galeriaActualizado = await Galeria.findByIdAndUpdate(galeriaId, nuevoGaleria, { new: true });

        res.json({
            ok: true,
            galeriaActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

const eliminarGaleria = async (req, res = response) => {

    const galeriaId = req.params.id;

    try {

        const galeria = await Galeria.findById(galeriaId);

        if (!galeria) {
            return res.status(404).json({
                ok: false,
                msg: 'Galeria no existe por id'
            })
        }

        const galeriaActualizado = await Galeria.findByIdAndDelete(galeriaId);

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
    getGaleria,
    crearGaleria,
    actualizarGaleria,
    eliminarGaleria,
}