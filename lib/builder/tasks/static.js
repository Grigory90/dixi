const gulp = require('gulp');
const changed = require('gulp-changed');

const cfg = require('../helpers/config');

function statics() {

    const dest = cfg.dirs.dev;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);

    if (!process.env.isProduction) {
        stream = stream.pipe(changed(dest));
    }

    return stream.pipe(gulp.dest(dest));
}

module.exports = statics;
