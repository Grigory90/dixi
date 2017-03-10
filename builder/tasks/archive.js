import gulp from 'gulp';
import zip from 'gulp-zip';
import moment from 'moment';

import cfg from '../config';

function archive() {

    return gulp.src(`${cfg.dir.dist}/**`, {base: cfg.dir.dist})
        .pipe(zip(`${cfg.app.name}_${moment().format('HHmmss_DDMMYYYY')}.zip`))
        .pipe(gulp.dest(cfg.dir.dist));

}

export default archive;
