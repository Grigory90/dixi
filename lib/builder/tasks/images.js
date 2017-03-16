const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

const server = require('./server').server;

const cfg = require('../helpers/config');

function images() {

    let dest = `${cfg.dirs.dev}/img`;
    let stream = gulp.src(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif,ico}`);

    if (process.env.isProduction) {
        stream = stream.pipe(imagemin(
            [
                imagemin.svgo({
                    plugins: [{
                        cleanupIDs: false
                    }]
                })
            ],
            cfg.pluginOptions.imagemin
        ));
    } else {
        stream = stream.pipe(changed(dest));
    }

    return stream.pipe(gulp.dest(dest)).pipe(server.stream());
}

module.exports = images;
