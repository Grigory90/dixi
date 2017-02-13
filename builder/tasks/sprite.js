import gulp from 'gulp';
import svgsprite from 'gulp-svg-sprite';

import cfg from '../config';

function sprite() {

    return gulp.src(`${cfg.dirs.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.plugins.svgsprite))
        .pipe(gulp.dest(`${cfg.dirs.src}/img`));
}

export default sprite;
