const gulp = require('gulp');

const taskTemplates = require('./templates');
const taskStyles = require('./styles');
const taskScripts = require('./scripts');
const taskImages = require('./images');
const taskSprite = require('./sprite');
const taskStatic = require('./static');

const reload = require('./server').reload;
const cfg = require('../config');

function watch(done) {

    gulp.watch(`${cfg.dirs.src}/twig/**/*.{html,twig,json}`, gulp.series(taskTemplates));
    gulp.watch(`${cfg.dirs.src}/${cfg.baseOptions.preproc}/**/*.${cfg.baseOptions.preproc}`, gulp.parallel(taskStyles));
    gulp.watch(`${cfg.dirs.src}/js/**/*.js`, gulp.series(taskScripts, reload));
    gulp.watch(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif,ico}`, gulp.parallel(taskImages));
    gulp.watch(`${cfg.dirs.src}/icons/**/*.svg`, gulp.series(taskSprite, taskTemplates));
    gulp.watch(`${cfg.dirs.src}/static/**/*.*`, gulp.series(taskStatic, reload));

    done();
}

module.exports = watch;
