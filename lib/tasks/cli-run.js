const gulp = require('gulp');

function run(done) {

    const series = gulp.series('initServer', 'watch');

    return series(done);
}

gulp.task(run);

module.exports = run;
