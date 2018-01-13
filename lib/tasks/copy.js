const gulp = require('gulp');
const changed = require('gulp-changed');
const { streamServer } = require('./server');

const cfg = global.dixiConfig;

function copyStatic() {

    const dest = cfg.dirs.dev;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);

    if (!global.isProduction) {

        stream = stream.pipe(changed(dest));
    }

    return stream.pipe(gulp.dest(dest)).pipe(streamServer());
}

function copySource() {

    return gulp.src(`${cfg.dirs.src}/**`).pipe(gulp.dest(`${cfg.dirs.dev}/src`));
}

gulp.task(copyStatic);
gulp.task(copySource);

module.exports = { copyStatic, copySource };
