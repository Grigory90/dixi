const gulp = require('gulp');
const zip = require('gulp-zip');

const {cfg, pkg} = require('../helpers/config');

function archive() {

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build})
        .pipe(zip(`${pkg.name}-${Date.parse(process.env.timestamp)}.zip`))
        .pipe(gulp.dest(cfg.dirs.build));
}

module.exports = archive;
