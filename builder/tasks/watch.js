import gulp from 'gulp';

import { reload } from './server';
import taskTemplates from './templates';
import taskStyles from './styles';
import taskScripts from './scripts';
import taskImages from './images';
import taskSprite from './sprite';
import taskStatics from './statics';

import cfg from '../config';

function watch(done) {

    gulp.watch(`${cfg.dirs.src}/html/**/*.{html,twig,json}`, gulp.series(taskTemplates, reload));
    gulp.watch(`${cfg.dirs.src}/${cfg.options.preproc}/**/*.${cfg.options.preproc}`, gulp.parallel(taskStyles));
    gulp.watch(`${cfg.dirs.src}/js/**/*.js`, gulp.series(taskScripts, reload));
    gulp.watch(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif}`, gulp.parallel(taskImages));
    gulp.watch(`${cfg.dirs.src}/icons/**/*.svg`, gulp.series(taskSprite, taskTemplates, reload));
    gulp.watch(`${cfg.dirs.src}/static/**/*.*`, gulp.series(taskStatics, reload));

    done();
}

export default watch;
