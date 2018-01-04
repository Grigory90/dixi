const gulp = require('gulp');
const size = require('gulp-size');

const { cfg } = require('../builder');

function sizeReport() {

    return gulp.src([
        `${cfg.dirs.build}/css/*.*`,
        `${cfg.dirs.build}/js/*.*`,
        `${cfg.dirs.build}/*.html`
    ])
    .pipe(size(cfg.pluginOptions.sizereport));
}

module.exports = sizeReport;
