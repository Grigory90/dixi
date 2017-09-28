const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const server = require('./server').server;
const cfg = require('../helpers/config');

function styles() {

    let stream = gulp.src(`${cfg.dirs.src}/scss/**/[^_]*.scss`);

    if (!process.env.isProduction) {
        stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(sass(cfg.pluginOptions.sass).on('error', sass.logError))
        .pipe(autoprefixer(cfg.baseOptions.browserslist));

    if (process.env.isProduction) {
        stream = stream.pipe(cssnano(cfg.pluginOptions.cssnano));
    }

    if (!process.env.isProduction) {
        stream = stream.pipe(sourcemaps.write());
    }

    stream.pipe(gulp.dest(`${cfg.dirs.dev}/css`));

    if (!process.env.isProduction) {
        stream.pipe(server.stream());
    }

    return stream;
}

module.exports = styles;
