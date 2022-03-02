const { response } = require('express');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');

const enviarCorreo = async (req, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);

    if (usuario) {
        if (usuario.rol == 'admin') {

            const { email, asunto, mensaje } = req.body;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            const mailOptions = {
                from: "Recetario S2C",
                to: email,
                subject: asunto,
                text: mensaje
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        err
                    });
                    console.log(err);
                } else {
                    res.status(200).json({
                        ok: true,
                        info
                    });
                    console.log(info);
                }
            });

        } else {

            res.status(400).json({
                ok: false,
                err: {
                    message: 'No tienes permisos para realizar esta acción'
                }
            });

        }
    } else {

        res.status(400).json({
            ok: false,
            err: {
                message: 'Usuario no encontrado'
            }
        });

    }

}

const enviarCorreoTodos = async (req, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);

    if (usuario) {
        if (usuario.rol == 'admin') {
            const { asunto, mensaje } = req.body;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });


            const users = await Usuario.find();

            users.forEach(async (user) => {
                console.log(user.email);
            });

            const mailErrors = [];

            const mailSuccess = [];

            for (let i = users.length - 1; i >= 0; i--) {

                const mailOptions = {
                    from: "Recetario S2C",
                    to: users[i].email,
                    subject: asunto,
                    text: mensaje
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        mailErrors.push(users[i].email);
                        i = -1;
                    } else {
                        mailSuccess.push(users[i].email);
                    }
                });

            }

            if (mailErrors.length > 0) {
                res.status(400).json({
                    ok: false,
                    mailErrors
                });
            } else {
                res.status(200).json({
                    ok: true,
                    mailSuccess
                });
            }
        } else {
            res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
    } else {
        res.status(400).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

}

const enviarCorreoVarios = async (req, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);

    if (usuario) {
        if (usuario.rol == 'admin') {
            const { emails, asunto, mensaje } = req.body;

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            const mailErrors = [];

            const mailSuccess = [];

            for (let i = emails.length - 1; i >= 0; i--) {

                const mailOptions = {
                    from: "Recetario S2C",
                    to: emails[i],
                    subject: asunto,
                    text: mensaje
                };

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        mailErrors.push(emails[i]);
                        i = -1;
                    } else {
                        mailSuccess.push(emails[i]);
                    }
                });

            }

            if (mailErrors.length > 0) {
                res.status(400).json({
                    ok: false,
                    mailErrors
                });
            } else {
                res.status(200).json({
                    ok: true,
                    mailSuccess
                });
            }
        } else {
            res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
    } else {
        res.status(400).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

}

const getCorreos = async (req, res = response) => {

    const uid = req.uid;

    const usuario = await Usuario.findById(uid);

    if (usuario) {

        if (usuario.rol == 'admin') {

            try {

                const users = await Usuario.find();

                const correos = [];

                users.forEach(async (user) => {
                    correos.push(user.email);
                });

                res.status(200).json({
                    ok: true,
                    correos
                });

            } catch (error) {
                res.status(400).json({
                    ok: false,
                    error
                });
            }

        } else {
            res.status(400).json({
                ok: false,
                msg: 'No tienes permisos para realizar esta acción'
            });
        }
    } else {
        res.status(400).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

}




module.exports = {
    enviarCorreo,
    enviarCorreoTodos,
    enviarCorreoVarios,
    getCorreos
}