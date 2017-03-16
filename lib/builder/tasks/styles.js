const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

const server = require('./server').server;
const log = require('../helpers/log');
const cfg = require('../helpers/config');

function styles(done) {

    let stream = gulp.src(`${cfg.dirs.src}/${cfg.baseOptions.preproc}/**/[^_]*.${cfg.baseOptions.preproc}`)
        .pipe(plumber(function (err) {
            console.log(err);
            this.emit('end');
            this.destroy();
        }));

    if (!process.env.isProduction) {
        stream = stream.pipe(sourcemaps.init());
    }

    if (cfg.baseOptions.preproc === 'sass' || cfg.baseOptions.preproc === 'scss') {
        stream = stream.pipe(sass(cfg.pluginOptions.sass));
    } else if (cfg.baseOptions.preproc === 'less') {
        stream = stream.pipe(less(cfg.pluginOptions.less));
    } else {
        log('WARNING: Css preprocessor not found, this task will be skipped.', 'yellow');
        return done();
    }

    stream = stream.pipe(autoprefixer(cfg.pluginOptions.autoprefixer));

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
