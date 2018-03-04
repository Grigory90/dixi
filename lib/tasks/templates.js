const fs = require('fs');
const gulp = require('gulp');
const twig = require('gulp-twig');

const cfg = global.dixiConfig;

function errorHandler(err) {

    console.log(err.message);

    this.emit('end');
}

function buildHTML() {

    const file = `${cfg.dirs.src}/data.json`;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const options = Object.assign(cfg.pluginOptions.twig, { data });

    return gulp.src(`${cfg.dirs.src}/twig/**/[^_]*.{html,twig}`)
        .pipe(twig(options))
        .on('error', errorHandler)
        .pipe(gulp.dest(cfg.dirs.dev));
}

gulp.task(buildHTML);

module.exports = buildHTML;
