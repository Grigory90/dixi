'use strict';

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'copyStatic',
        description: 'Copying static files.',
        config: builder.config.task.copyStatic(builder)
    };

    function handler()
    {
        const series = [];

        for (let config of task.config)
        {
            const stream = gulp
                .src(config.src, { since: gulp.lastRun(handler) })
                .pipe(gulp.dest(config.dest[builder.mode]));
   
            series.push(stream);
        }

        return Promise.all(series);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
