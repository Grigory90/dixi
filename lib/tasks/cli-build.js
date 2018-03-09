const gulp = require('gulp');

const cfg = global.dixiConfig;

function build(done) {

    cfg.builder.enableProduction();

    const series = gulp.series(cfg.builder.tasks.build);

    return series(done);
}

gulp.task(build);

module.exports = build;
