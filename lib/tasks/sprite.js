const gulp = require('gulp');
const svgsprite = require('gulp-svg-sprite');

const { cfg } = require('../builder');

function buildSVG() {

    return gulp.src(`${cfg.dirs.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.pluginOptions.svgsprite))
        .pipe(gulp.dest(`${cfg.dirs.dev}/img`));
}

module.exports = buildSVG;
