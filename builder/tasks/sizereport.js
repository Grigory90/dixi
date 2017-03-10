import gulp from 'gulp';
import report from 'gulp-sizereport';

import cfg from '../config';

function sizereport() {

    return gulp.src([`${cfg.dir.dist}/js/*.js`, `${cfg.dir.dist}/css/*.css`])
        .pipe(report(cfg.plugins.sizereport));
}

export default sizereport;
