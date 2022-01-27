const { Schema, model } = require('mongoose');

const CalendarioSchema = Schema({

    imagen: {
        type: String,
        required: true
    },

});

CalendarioSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Calendario', CalendarioSchema);