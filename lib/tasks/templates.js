const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');

const { cfg } = require('../builder');

function errorHandler(err) {

    console.log(err.message);

    this.emit('end');
}

function buildHTML() {

    const data = fs.readFileSync(`${cfg.dirs.src}/data.json`, 'utf8');
    const options = Object.assign(cfg.pluginOptions.twig, { data: JSON.parse(data) });

    return gulp.src(`${cfg.dirs.src}/twig/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .on('error', errorHandler)
        .pipe(gulp.dest(cfg.dirs.dev));
}

module.exports = buildHTML;
