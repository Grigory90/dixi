const gulp = require('gulp');
const changed = require('gulp-changed');

const { streamServer } = require('./server');
const { cfg } = require('../builder');

function copyStatic() {

    const dest = cfg.dirs.dev;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);

    if (!process.env.isProduction) {

        stream = stream.pipe(changed(dest));
    }

    return stream.pipe(gulp.dest(dest)).pipe(streamServer());
}

function copySource() {

    return gulp.src(`${cfg.dirs.src}/**`).pipe(gulp.dest(`${cfg.dirs.dev}/src`));
}

module.exports = { copyStatic, copySource };
