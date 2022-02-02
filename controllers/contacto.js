const { response } = require("express");
const Contacto = require('../models/Contacto');
const Usuario = require("../models/Usuario");

const getContacto = async (req, res = response) => {

    const uid = req.params.uid;

    if(uid){

        const user = await Usuario.findById(uid);

        if(!!user){

            if(user.rol === 'admin'){

                try {

                    const contacto = await Contacto.find();

                    res.json({
                        ok: true,
                        contacto
                    })

                } catch (error) {
                    res.status(500).json({
                        ok: false,
                        msg: 'Error, hablar con administrador'
                    })
                }

            }else{
                res.status(403).json({
                    ok: false,
                    msg: 'No tienes permisos'
                })
            }

        }else{
            res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

    }else{
        res.status(404).json({
            ok: false,
            msg: 'Usuario no existe'
        })
    }

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
    eliminarContacto,
}