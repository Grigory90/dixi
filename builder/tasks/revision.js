import gulp from 'gulp';
import revall from 'gulp-rev-all';
import revdel from 'gulp-rev-delete-original';

import cfg from '../config';

function revision() {

    return gulp.src([`${cfg.dirs.build}/**/*.{html,css,js}`, `!${cfg.dirs.build}/**/vendor{,/**}`])
    	.pipe(revall.revision(cfg.plugins.revall))
    	.pipe(revdel())
    	.pipe(gulp.dest(cfg.dirs.build))
        .pipe(rev.manifestFile())
        .pipe(gulp.dest(cfg.dirs.build));
}

export default revision;
