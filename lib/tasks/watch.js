const gulp = require('gulp');

const buildHTML = require('./templates');
const buildCSS = require('./styles');
const buildJS = require('./scripts');
const buildSVG = require('./sprite');
const { copyStatic } = require('./copy');

const { reloadServer } = require('./server');
const { cfg } = require('../builder');

function watch(done) {

    gulp.watch([`${cfg.dirs.src}/twig/**`, `${cfg.dirs.src}/*.json`], gulp.series(buildHTML, reloadServer));
    gulp.watch(`${cfg.dirs.src}/scss/**`, buildCSS);
    gulp.watch(`${cfg.dirs.src}/js/**`, gulp.series(buildJS, reloadServer));
    gulp.watch(`${cfg.dirs.src}/icons/**`, gulp.series(buildSVG, buildHTML, reloadServer));
    gulp.watch(`${cfg.dirs.src}/static/**`, gulp.series(copyStatic, reloadServer));

    done();
}

module.exports = watch;
