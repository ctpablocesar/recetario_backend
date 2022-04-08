const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    name: {
        type: String,
        requiredd: true
    },
    rol: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    multisesion: {
        type: Boolean,
        default: false
    },
    fechaFin: {
        type: Number,
        required: false,
        default: null
    }

})

module.exports = model('Usuario', UsuarioSchema);