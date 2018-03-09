const gulp = require('gulp');

const cfg = global.dixiConfig;

function watch(done) {

    cfg.builder.observers.forEach((item) => {

        gulp.watch(
            item.glob.map(glob => cfg.dirs.src + glob),
            gulp.series(item.series)
        );
    });

    done();
}

gulp.task(watch);

module.exports = watch;
