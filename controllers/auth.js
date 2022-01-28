const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password, rol } = req.body;

    if(rol === 'user') {

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
}else{
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

        // confirmamr el password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrectos'
            });
        }

        // generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        console.log(usuario);
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
// TODO: no sirve revalidar token
const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })

};

const crearAdmin = async (req, res = response) => {

    const uid = req.params.uid;

    const user = await Usuario.findById(uid);

    if (!!user) {
        if (user.rol === 'admin') {

            try {

                const usuario = new Usuario(req.body);

                usuario.role = 'admin';

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
    crearAdmin
}
