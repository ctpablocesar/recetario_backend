const { Schema, model } = require('mongoose');

const ImagenSchema = Schema({

    titulo: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }

});

ImagenSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Imagen', ImagenSchema);