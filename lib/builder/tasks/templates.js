const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');

const {cfg} = require('../helpers/config');

function errorHandler(err) {
    console.log(err.message);
    this.emit('end');
}

function templates() {

    const options = Object.assign(cfg.pluginOptions.twig, {
        data: JSON.parse(fs.readFileSync(`${cfg.dirs.src}/twig/data.json`, 'utf8'))
    });

    return gulp.src(`${cfg.dirs.src}/twig/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .on('error', errorHandler)
        .pipe(gulp.dest(cfg.dirs.dev));
}

module.exports = templates;
