const { response } = require("express");
const Galeria = require('../models/Galeria');
const Usuario = require("../models/Usuario");

const getGaleria = async (req, res = response) => {

    const galeria = await Galeria.find()

    res.json({
        ok: true,
        galeria
    })

}

const crearGaleria = async (req, res = response) => {

    const galeria = new Galeria(req.body);

    const uid = req.uid;

    const user = await Usuario.findById(uid);

    if (user.rol === 'admin') {

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
    } else {
        return res.status(401).json({
            ok: false,
            msg: 'No tienes permisos para realizar esta acción'
        })
    }

}

const eliminarGaleria = async (req, res = response) => {

    const galeriaId = req.params.id;

    const uid = req.uid;

    const user = await Usuario.findById(uid);

    if (user.rol === 'admin') {

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
    }else{

        req.status(401).json({
            ok: false,
            msg: 'No tienes permisos para realizar esta acción'
        })

    }

}


module.exports = {
    getGaleria,
    crearGaleria,
    eliminarGaleria,
}