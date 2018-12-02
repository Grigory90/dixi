'use strict';

const path = require('path');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const revDeleteOriginal = require('gulp-rev-delete-original');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'revisionStatic',
        description: 'Revision files.',
        config: builder.config.task.revisionStatic(builder)
    };

    function handler(done)
    {
        return gulp.series(revision, replace)(done);
    }

    function revision()
    {
        return gulp.src(task.config.src)
            .pipe(rev())
            .pipe(revDeleteOriginal())
            .pipe(gulp.dest(task.config.dest))
            .pipe(rev.manifest(task.config.plugin.rev.manifestPath))
            .pipe(gulp.dest(task.config.dest));
    }

    function replace()
    {
        const { dest, plugin } = task.config;
        const manifest = path.resolve(dest, plugin.rev.manifestPath);

        return gulp.src([manifest, plugin.collector.replacePaths])
            .pipe(revCollector())
            .pipe(gulp.dest(dest));
    }

    handler.displayName = task.name;
    handler.description = task.description;

    revision.displayName = ` └─${revision.name}`;
    replace.displayName = ` └─${replace.name}`;

    gulp.task(handler);

    return handler;
};
