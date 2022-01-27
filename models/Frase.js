const { Schema, model } = require('mongoose');

const FraseSchema = Schema({

    imagen: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    frase: {
        type: String,
        required: true
    }
});

FraseSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Frase', FraseSchema);