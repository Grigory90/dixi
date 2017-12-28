const gulp = require('gulp');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const revDeleteOriginal = require('gulp-rev-delete-original');

const { cfg } = require('../builder');

function revision() {

    const src = [
        `${cfg.dirs.build}/**/*.{css,js}`,
        `!${cfg.dirs.build}/**/vendor{,/**}`
    ];

    return gulp.src(src)
        .pipe(rev())
        .pipe(revDeleteOriginal())
        .pipe(gulp.dest(cfg.dirs.build))
        .pipe(rev.manifest(cfg.pluginOptions.rev.manifestName))
        .pipe(gulp.dest(cfg.dirs.build));
}

function replace() {

    const manifestFile = gulp.src(`${cfg.dirs.build}/${cfg.pluginOptions.rev.manifestName}`);

    return gulp.src(`${cfg.dirs.build}/**/*.html`)
        .pipe(revReplace({ manifest: manifestFile }))
        .pipe(gulp.dest(cfg.dirs.build));
}

revision.displayName = ` └─${revision.name}`;
replace.displayName = ` └─${replace.name}`;

function revisionAssets(done) {

    const series = gulp.series(revision, replace);

    return series(done);
}

module.exports = revisionAssets;
