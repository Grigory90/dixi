const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const { streamServer } = require('./server');
const { cfg } = require('../builder');

function buildCSS() {

    let stream = gulp.src(`${cfg.dirs.src}/scss/**/[^_]*.scss`);

    if (!process.env.isProduction) {

        stream = stream.pipe(sourcemaps.init());
    }

    stream = stream.pipe(sass(cfg.pluginOptions.sass)
        .on('error', sass.logError))
        .pipe(autoprefixer(cfg.baseOptions.browsersList));

    if (process.env.isProduction) {

        stream = stream.pipe(cssnano(cfg.pluginOptions.cssnano));

    } else {

        stream = stream.pipe(sourcemaps.write());
    }

    stream.pipe(gulp.dest(`${cfg.dirs.dev}/css`));

    if (!process.env.isProduction) {

        stream.pipe(streamServer());
    }

    return stream;
}

module.exports = buildCSS;
