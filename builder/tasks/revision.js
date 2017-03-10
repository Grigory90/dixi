import gulp from 'gulp';
import revall from 'gulp-rev-all';
import revdel from 'gulp-rev-delete-original';

import cfg from '../config';

function revision() {

    return gulp.src([`${cfg.dir.build}/**/*.{html,css,js}`, `!${cfg.dir.build}/**/vendor{,/**}`])
    	.pipe(revall.revision(cfg.plugins.revall))
    	.pipe(revdel())
    	.pipe(gulp.dest(cfg.dir.build))
        .pipe(revall.manifestFile())
        .pipe(gulp.dest(cfg.dir.build));
}

export default revision;
