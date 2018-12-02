'use strict';

const changed = require('gulp-changed');

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
            let stream = gulp.src(config.src);
            const dest = config.dest[builder.mode];

            if (builder.isDev)
            {
                stream = stream.pipe(changed(dest));
            }

            series.push(stream.pipe(gulp.dest(dest)));
        }

        return Promise.all(series);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
