import gulp from 'gulp';
import changed from 'gulp-changed';

import cfg from '../config';

function statics() {

    const dest = cfg.dirs.build;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);

    if (!cfg.builder.prod) stream = stream.pipe(changed(dest));

    return stream.pipe(gulp.dest(dest));
}

export default statics;
