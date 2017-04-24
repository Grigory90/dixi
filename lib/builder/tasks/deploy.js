const gulp = require('gulp');
const util = require('util');
const ftp = require('vinyl-ftp');

const cfg = require('../helpers/config');

function deploy() {

    const dest = util.format(cfg.dirs.deploy, cfg.pkg.name || `project-${process.env.buildTimestamp}`);
    const connect = ftp.create(cfg.pluginOptions.ftp);

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build, buffer: false})
        .pipe(connect.dest(dest));
}

module.exports = deploy;
