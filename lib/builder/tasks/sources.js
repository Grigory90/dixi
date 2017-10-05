const gulp = require('gulp');

const {cfg} = require('../helpers/config');

function sources() {

    return gulp.src(`${cfg.dirs.src}/**`).pipe(gulp.dest(`${cfg.dirs.dev}/src`));
}

module.exports = sources;
