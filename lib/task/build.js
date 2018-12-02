'use strict';

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'build',
        description: 'Build project.'
    };

    function handler(done)
    {
        return gulp.series(builder.buildSeries)(done);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
