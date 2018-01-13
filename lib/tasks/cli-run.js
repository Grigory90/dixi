const gulp = require('gulp');
const { initServer } = require('./server');

function run(done) {

    const series = gulp.series(initServer, 'watch');

    return series(done);
}

gulp.task(run);

module.exports = run;
