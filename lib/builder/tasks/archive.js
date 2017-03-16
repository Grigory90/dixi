const gulp = require('gulp');
const zip = require('gulp-zip');
const moment = require('moment');

const cfg = require('../helpers/config');

function archive() {

    const name = cfg.pkg.name || cfg.baseOptions.defaultName;
    const date = moment().format('HHmmss_DDMMYYYY');

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build})
        .pipe(zip(`${name}_${date}.zip`))
        .pipe(gulp.dest(cfg.dirs.build));
}

module.exports = archive;
