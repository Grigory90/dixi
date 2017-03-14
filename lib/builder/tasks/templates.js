const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');

const server = require('./server').server;
const cfg = require('../config');

function templates() {

    const options = Object.assign(cfg.pluginOptions.twig, {
        data: JSON.parse(fs.readFileSync(`${cfg.dirs.src}/twig/data.json`, 'utf8'))
    });

    return gulp.src(`${cfg.dirs.src}/twig/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .pipe(gulp.dest(cfg.dirs.dev)).pipe(server.stream());
}

module.exports = templates;
