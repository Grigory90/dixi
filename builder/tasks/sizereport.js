import gulp from 'gulp';
import report from 'gulp-sizereport';

import cfg from '../config';

function sizereport() {

    return gulp.src([`${cfg.dirs.build}/js/*.js`, `${cfg.dirs.build}/css/*.css`])
        .pipe(report(cfg.plugins.sizereport));
}

export default sizereport;
