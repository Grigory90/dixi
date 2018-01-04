const gulp = require('gulp');
const zip = require('gulp-zip');

const { cfg } = require('../builder');

function archive() {

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build})
        .pipe(zip(`build-${Date.parse(process.env.timestamp)}.zip`))
        .pipe(gulp.dest(cfg.dirs.build));
}

module.exports = archive;
