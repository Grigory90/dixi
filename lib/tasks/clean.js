const del = require('del');

const { cfg } = require('../builder');

function clean() {

    return del(`${cfg.dirs.build}/**`);
}

module.exports = clean;
