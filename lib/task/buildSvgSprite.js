'use strict';

const sprite = require('gulp-svg-sprite');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'buildSvgSprite',
        description: 'Create svg sprite from icons.',
        config: builder.config.task.buildSvgSprite(builder)
    };

    async function handler()
    {
        const series = [];

        for (let config of task.config)
        {
            const stream = gulp.src(config.src)
                .pipe(sprite(config.plugin))
                .pipe(gulp.dest(config.dest));

            series.push(stream);
        }

        await Promise.all(series);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
