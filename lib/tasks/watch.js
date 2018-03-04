const gulp = require('gulp');
const { reloadServer } = require('./server');

const cfg = global.dixiConfig;

function watch(done) {

    gulp.watch(
        [
            `${cfg.dirs.src}/twig/**`,
            `${cfg.dirs.src}/data.json`
        ],
        gulp.series('buildHTML', reloadServer)
    );

    gulp.watch(
        `${cfg.dirs.src}/scss/**`,
        gulp.series('buildCSS')
    );

    gulp.watch(
        `${cfg.dirs.src}/js/**`,
        gulp.series('buildJS', reloadServer)
    );

    gulp.watch(
        `${cfg.dirs.src}/icons/**`,
        gulp.series('buildSVG')
    );

    gulp.watch(
        `${cfg.dirs.src}/static/**`,
        gulp.series('copyStatic', 'buildHTML', reloadServer)
    );

    done();
}

gulp.task(watch);

module.exports = watch;
