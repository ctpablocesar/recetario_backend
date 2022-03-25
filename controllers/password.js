const mjml2html = require('mjml');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");


const ForgotPassword = async (req, res) => {

  const correo = req.body.correo;

  const usuario = await Usuario.findOne({ email: correo });

  const { _id, email, name } = usuario;

  if (usuario) {

    const token = await generarJWT(_id, email);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const link = `http://saucedoemanuel.utdgrupoti.com/#/reset-password/${token}`;

    const htmlOutput = mjml2html(`
          <mjml>
          <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
            <mj-section background-color="#464e2e" background-repeat="no-repeat" text-align="center" vertical-align="top" padding="0 0 0 0">
              <mj-column>
                <mj-text align="left" color="#55575d" font-family="sans-serif" font-size="13px" line-height="22px" padding-bottom="5px" padding-top="25px" padding="10px 25px">
                  <p style="line-height: 50px; text-align: center; margin: 10px 0;font-size:40px;color:#fcfcfc;font-family:sans-serif"><b>Oye, ${name}, ¿querías restablecer tu contraseña?</b></p>
                </mj-text>
              </mj-column>
            </mj-section>
            <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" vertical-align="top" padding="0 0 0 0">
              <mj-column>
                <mj-image align="center" border="none" padding-bottom="0px" padding-left="0px" padding-right="0px" padding="0px 25px" src="https://res.cloudinary.com/drax2d1vi/image/upload/v1648096852/rk4ugqzyuhrkaqowhpec.png" target="_blank" title="" width="780px"></mj-image>
              </mj-column>
            </mj-section>
            <mj-section background-color="#464e2e" background-repeat="no-repeat" text-align="center" vertical-align="top" padding="0 0 0 0">
              <mj-column>
                <mj-text align="left" color="#55575d" font-family="sans-serif" font-size="13px" line-height="22px" padding-bottom="5px" padding-top="25px" padding="10px 25px">
                  <p style="line-height: 20px; text-align: center; margin: 10px 0;font-size:18px;color:#fcfcfc;font-family:sans-serif"><b>Alguien (esperamos que hayas sido tú) nos pidió que restableciéramos la contraseña para tu cuenta del Recetario S2C. Haz clic en el botón de abajo para ello. Si no solicitaste restablecer tu contraseña, ignora este correo electrónico.</b></p>
                </mj-text>
              </mj-column>
            </mj-section>
            <mj-section background-color="#464e2e" background-repeat="no-repeat" text-align="center" vertical-align="top" padding-bottom="40px" padding="0 0 0 0">
              <mj-column>
                <mj-button background-color="#ffffff" border-radius="3px" font-family=" Helvetica, Arial, sans-serif" font-size="18px" font-weight="normal" inner-padding="10px 25px" padding-top="30px" padding-bottom="30px" padding="10px 25px" href="${link}" target="_blank"><span style="color:#212020">Restablecer contraseña</span></mj-button>
                <mj-text align="left" color="#55575d" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="0px" padding-top="5px" padding="10px 25px">
                  <p style="line-height: 16px; text-align: center; margin: 10px 0;font-size:12px;color:#ffffff;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><span>
                    ${link}
                    </span></p>
                </mj-text>
              </mj-column>
            </mj-section>
          </mj-body>
        </mjml>
          `, 'utf8');

    const mailOptions = {
      from: "Recetario S2C",
      to: email,
      subject: 'Recuperar contraseña',
      html: htmlOutput.html
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
      }
    });

  } else {

    res.status(400).json({
      ok: false,
      err: {
        message: "El correo no está registrado"
      }
    });

  }

}

const ResetPassword = async (req, res) => {

  const newPassword = req.body.password;
  const token = req.body.token;

  const jwtDecoded = jwt.decode(token, process.env.SECRET, (err, decoded) => {

    if (err) {
      res.status(400).json({
        ok: false,
        err
      });
    }

    return decoded;

  });

  const usuario = await Usuario.findOne({ email: jwtDecoded.name });

  if (usuario) {

    const { _id } = usuario;

    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync(newPassword, salt);

    const newUser = await Usuario.findByIdAndUpdate(_id, { password: password });

    res.status(200).json({
      ok: true,
      msg: "Contraseña restablecida correctamente"
    });

  } else {

    res.status(400).json({
      ok: false,
      err: {
        message: "El correo no está registrado"
      }
    });

  }

}

module.exports = {
  ForgotPassword,
  ResetPassword
}