const gulp = require('gulp');
const ftp = require('vinyl-ftp');

const cfg = require('../config');

function deploy() {

    const dest = cfg.dirs.deploy.replace('%s', cfg.pkg.name || cfg.baseOptions.defaultName);
    const connect = ftp.create(cfg.pluginOptions.ftp);

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build, buffer: false})
        .pipe(connect.dest(dest));
}

module.exports = deploy;
