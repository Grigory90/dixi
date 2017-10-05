const gulp = require('gulp');
const revall = require('gulp-rev-all');
const revdel = require('gulp-rev-delete-original');

const {cfg} = require('../helpers/config');

function revision() {

    return gulp.src([
        `${cfg.dirs.build}/**/*.{html,css,js}`, `!${cfg.dirs.build}/**/vendor{,/**}`
    ])
	.pipe(revall.revision(cfg.pluginOptions.revall))
	.pipe(revdel())
	.pipe(gulp.dest(cfg.dirs.build))
    .pipe(revall.manifestFile())
    .pipe(gulp.dest(cfg.dirs.build));
}

module.exports = revision;
