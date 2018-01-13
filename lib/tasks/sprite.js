const gulp = require('gulp');
const svgsprite = require('gulp-svg-sprite');

const cfg = global.dixiConfig;

function buildSVG() {

    return gulp.src(`${cfg.dirs.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.pluginOptions.svgsprite))
        .pipe(gulp.dest(`${cfg.dirs.src}/static/img`));
}

gulp.task(buildSVG);

module.exports = buildSVG;
