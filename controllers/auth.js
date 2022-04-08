const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password, rol } = req.body;

    if (rol === 'user') {

        try {
            let usuario = await Usuario.findOne({ email: email });

            if (usuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Un usuario existe con ese correo'
                })
            }

            usuario = new Usuario(req.body);

            // encriptar contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt);

            await usuario.save();


            const token = await generarJWT(usuario.id, usuario.name);



            res.status(201).json({
                ok: true,
                uid: usuario.id,
                name: usuario.name,
                token
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Por favor hable con el admin'
            })
        }
    } else {
        res.status(403).json({
            ok: false,
            msg: 'No tienes permisos para crear usuarios'
        })
    }

};

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        const { multisesion, fechaFin: fin } = usuario;
        const now = new Date();

        if (multisesion) {
            if (fin > now.getTime()) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El usuario ya inicio sesion',
                });
            }
        }

        // confirmamr el password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        const fechafin = now.getTime() + (60 * 60000 * 2);

        const newuser = await Usuario.findOneAndUpdate({ _id: usuario._id }, {
            multisesion: true,
            fechaFin: fechafin
        });

        // generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            rol: usuario.rol,
            token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

};

const cerrarSesion = async (req, res = response) => {

    const uid = req.uid;

    const user = await Usuario.findById(uid);

    if (!!user) {

        const newuser = await Usuario.findOneAndUpdate({ _id: uid }, {
            multisesion: false,
        });

        res.json({
            ok: true,
            msg: 'Sesion cerrada'
        })
    }

}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    const usuario = await Usuario.findById(uid);

    if (!!usuario) {

        const token = await generarJWT(uid, name);

        const fechafin = new Date().getTime() + (60 * 60000 * 2);

        const newuser = await Usuario.findOneAndUpdate({ _id: uid }, {
            multisesion: true,
            fechaFin: fechafin
        });

        res.json({
            ok: true,
            uid,
            name,
            token
        })
    }else{
        res.status(403).json({
            ok: false,
            msg: 'Usuario no encontrado'
        })
    }


};

const crearAdmin = async (req, res = response) => {

    const uid = req.body.uid;

    const user = await Usuario.findById(uid);

    if (!!user) {
        if (user.rol === 'admin') {

            try {

                const { name, rol, password, email } = req.body;

                let usuario = new Usuario({
                    name,
                    rol,
                    email
                });

                usuario.rol = 'admin';

                // encriptar contraseña
                const salt = bcrypt.genSaltSync();
                usuario.password = bcrypt.hashSync(password, salt);

                console.log(usuario);

                await usuario.save();

                res.json({
                    ok: true,
                    usuario
                })

            } catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'Por favor hable con el admin'
                })
            }

        }
    } else {
        res.status(403).json({
            ok: false,
            msg: 'No tienes permisos para crear un administrador'
        })
    }

};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    crearAdmin,
    cerrarSesion
}
