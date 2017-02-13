import gulp from 'gulp';
import zip from 'gulp-zip';
import moment from 'moment';

import cfg from '../config';

function archive() {

    return gulp.src(`${cfg.dirs.dist}/**`, {base: cfg.dirs.dist})
        .pipe(zip(`${cfg.app.name}_${moment().format('HHmmss_DDMMYYYY')}.zip`))
        .pipe(gulp.dest(cfg.dirs.dist));

}

export default archive;
