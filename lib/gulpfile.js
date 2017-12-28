const gulp = require('gulp');

const watch = require('./tasks/watch');
const build = require('./tasks/build');
const { initServer } = require('./tasks/server');

gulp.task('default', gulp.series(initServer, watch));

gulp.task(build);
