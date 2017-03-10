import gulp from 'gulp';
import svgsprite from 'gulp-svg-sprite';

import cfg from '../config';

function sprite() {

    return gulp.src(`${cfg.dir.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.plugins.svgsprite))
        .pipe(gulp.dest(`${cfg.dir.src}/img`));
}

export default sprite;
