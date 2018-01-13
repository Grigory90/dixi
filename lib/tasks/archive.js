const gulp = require('gulp');
const zip = require('gulp-zip');

const cfg = global.dixiConfig;

function createArchive() {

    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build})
        .pipe(zip(`build-${Date.parse(new Date())}.zip`))
        .pipe(gulp.dest(cfg.dirs.build));
}

gulp.task(createArchive);

module.exports = createArchive;
