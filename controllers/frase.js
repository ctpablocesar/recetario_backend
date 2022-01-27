const { response } = require("express");
const Frase = require('../models/Frase');
const moment = require('moment');
require('moment/locale/es-mx');

const getFrase = async (req, res = response) => {

    const frase = await Frase.find()

    res.json({
        ok: true,
        frase
    })

}

const crearFrase = async (req, res = response) => {

    const frase = new Frase(req.body);

    try {

        const fraseGuardada = await frase.save()

        res.json({
            ok: true,
            frase: fraseGuardada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarFrase = async (req, res = response) => {

    const FraseId = req.params.id;

    try {

        const frase = await Frase.findById(FraseId);

        if (!frase) {
            return res.status(404).json({
                ok: false,
                msg: 'Frase no existe por id'
            })
        }

        const nuevaFrase = {
            ...req.body,
            'fecha': (Date.now())
        }

        const fraseActualizada = await Frase.findByIdAndUpdate(FraseId, nuevaFrase, { new: true });

        res.json({
            ok: true,
            fraseActualizada: fraseActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

module.exports = {
    getFrase,
    crearFrase,
    actualizarFrase,
}