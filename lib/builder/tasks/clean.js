const del = require('del');

const cfg = require('../config');

function clean() {

    return del([`${cfg.dirs.build}/**`, `!${cfg.dirs.build}`]);
}

module.exports = clean;
