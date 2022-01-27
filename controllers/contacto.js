const { response } = require("express");
const Contacto = require('../models/Contacto');

const getContacto = async (req, res = response) => {

    const contacto = await Contacto.find()

    res.json({
        ok: true,
        contacto
    })

}

const crearContacto = async (req, res = response) => {

    const contacto = new Contacto(req.body);

    try {

        const contactoGuardado = await contacto.save()

        res.json({
            ok: true,
            contacto: contactoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, hablar con administrador'
        })
    }
}

const actualizarContacto = async (req, res = response) => {

    const contactoId = req.params.id;

    try {

        const contacto = await Contacto.findById(contactoId);

        if (!contacto) {
            return res.status(404).json({
                ok: false,
                msg: 'Contacto no existe por id'
            })
        }

        const nuevoContacto = {
            ...req.body,
            'fecha': (Date.now())
        }

        const contactoActualizado = await Contacto.findByIdAndUpdate(contactoId, nuevoContacto, { new: true });

        res.json({
            ok: true,
            contactoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, hable con el administrador'
        })
    }

}

const eliminarContacto = async (req, res = response) => {

    const contactoId = req.params.id;

    try {

        const contacto = await Contacto.findById(contactoId);

        if (!contacto) {
            return res.status(404).json({
                ok: false,
                msg: 'Contacto no existe por id'
            })
        }

        const contactoActualizado = await Contacto.findByIdAndDelete(contactoId);

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
    getContacto,
    crearContacto,
    actualizarContacto,
    eliminarContacto,
}