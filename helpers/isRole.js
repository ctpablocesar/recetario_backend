const isRole = (value) => {
    if (!value) {
        return false;
    }
    if (value === 'admin' || value === 'user') {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isRole
}