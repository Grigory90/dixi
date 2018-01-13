const gulp = require('gulp');

const cfg = global.dixiConfig;

function build(done) {

    cfg.builder.enableProduction();

    const tasks = cfg.builder.task.build;

    if (cfg.baseOptions.enableRevision) {

        tasks.push('revisionAssets');
    }

    if (cfg.baseOptions.includeSources) {

        tasks.push('copySource');
    }

    if (cfg.baseOptions.createArchive) {

        tasks.push('createArchive');
    }

    const series = gulp.series(tasks);

    return series(done);
}

gulp.task(build);

module.exports = build;
