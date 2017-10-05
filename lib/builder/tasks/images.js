const gulp = require('gulp');
const changed = require('gulp-changed');

const server = require('./server').server;

const {cfg} = require('../helpers/config');

function images() {

    const dest = `${cfg.dirs.dev}/img`;

    return gulp.src(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif,ico}`)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest)).pipe(server.stream());
}

module.exports = images;
