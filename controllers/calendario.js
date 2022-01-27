const { response } = require("express");
const Calendario = require('../models/Calendario');
const moment = require('moment');
require('moment/locale/es-mx');

const getCalendario = async (req, res = response) => {

    const calendario = await Calendario.find()

    res.json({
        ok: true,
        calendario
    })

}

const crearCalendario = async (req, res = response) => {

    const calendario = new Calendario(req.body);

    try {

        const calendarioGuardada = await calendario.save()

        res.json({
            ok: true,
            calendario: calendarioGuardada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarCalendario = async (req, res = response) => {

    const CalendarioId = req.params.id;

    try {

        const calendario = await Calendario.findById(CalendarioId);

        if (!calendario) {
            return res.status(404).json({
                ok: false,
                msg: 'Calendario no existe por id'
            })
        }

        const nuevaCalendario = {
            ...req.body,
            'fecha': (Date.now())
        }

        const calendarioActualizada = await Calendario.findByIdAndUpdate(CalendarioId, nuevaCalendario, { new: true });

        res.json({
            ok: true,
            calendarioActualizada: calendarioActualizada
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
    getCalendario,
    crearCalendario,
    actualizarCalendario,
}