const gulp = require('gulp');
const svgsprite = require('gulp-svg-sprite');

const cfg = require('../config');

function sprite() {

    return gulp.src(`${cfg.dirs.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.pluginOptions.svgsprite))
        .pipe(gulp.dest(`${cfg.dirs.src}/img`));
}

module.exports = sprite;
