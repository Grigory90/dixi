const gulp = require('gulp');
const del = require('del');

const cfg = global.dixiConfig;

function cleanup() {

    return del(`${cfg.dirs.build}/**`, { force: true });
}

gulp.task(cleanup);

module.exports = cleanup;
