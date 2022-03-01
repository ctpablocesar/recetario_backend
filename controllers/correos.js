const { response } = require('express');
const nodemailer = require('nodemailer');

const enviarCorreo = async (req, res = response) => {

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

}

module.exports = {
    enviarCorreo
}