const gulp = require('gulp');
const report = require('gulp-sizereport');

const cfg = require('../helpers/config');

function sizereport() {

    return gulp.src([
        `${cfg.dirs.build}/css/**`,
        `${cfg.dirs.build}/js/**`,
        `${cfg.dirs.build}/**/*.html`
    ])
    .pipe(report(cfg.pluginOptions.sizereport));
}

module.exports = sizereport;
