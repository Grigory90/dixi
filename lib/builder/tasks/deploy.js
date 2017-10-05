const gulp = require('gulp');
const util = require('util');
const ftp = require('vinyl-ftp');

const {cfg, pkg} = require('../helpers/config');

function deploy() {

    const dest = util.format(cfg.dirs.deploy, pkg.name);
    const connect = ftp.create(cfg.pluginOptions.ftp);

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build, buffer: false})
        .pipe(connect.dest(dest));
}

module.exports = deploy;
