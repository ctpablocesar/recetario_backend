const { Schema, model } = require('mongoose');

const RecetaSchema = Schema({

    titulo: {
        type: String,
        required: [true]
    },
    descripcion: {
        type: String,
        required: [true]
    },
    ingredientes: {
        type: String,
        required: [true]
    },
    tiempo: {
        type: String,
        required: [true]
    },
    procedimiento: {
        type: String,
        required: [true]
    },
    etiquetas: {
        type: String,
        required: [true]
    },
    status: {
        type: Boolean,
        required: [true]
    },
    fecha: {
        type: String,
        required: [true]
    },
    tipo: {
        type: String,
        required: [true]
    },
    ocacion: {
        type: String,
        required: [true]
    },
    uid: {
        type: String,
        required: [true]
    }

});

RecetaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Receta', RecetaSchema);