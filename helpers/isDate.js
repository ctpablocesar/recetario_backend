const moment = require('moment');
require('moment/locale/es-mx');

const isDate = (value) => {

    if (!value) {
        return false;
    }

    const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }

};

module.exports = {
    isDate
};