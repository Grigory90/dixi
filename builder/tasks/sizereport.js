import gulp from 'gulp';
import report from 'gulp-sizereport';

import cfg from '../config';

function sizereport() {

    return gulp.src([`${cfg.dirs.dist}/js/*.js`, `${cfg.dirs.dist}/css/*.css`])
        .pipe(report(cfg.plugins.sizereport));
}

export default sizereport;
