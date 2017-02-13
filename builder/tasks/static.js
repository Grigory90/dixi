import gulp from 'gulp';
import changed from 'gulp-changed';

import cfg from '../config';

function static() {

    const dest = cfg.dirs.build;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);

    if (!isProduction) stream = stream.pipe(changed(dest));

    return stream.pipe(gulp.dest(dest));
}

export default static;
