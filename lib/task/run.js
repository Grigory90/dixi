'use strict';

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'run',
        description: 'Run server and watchers.'
    };

    function handler(done)
    {
        return gulp.series(builder.config.options.runSeries)(done);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
