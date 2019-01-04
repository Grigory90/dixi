'use strict';

const del = require('del');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'cleanup',
        description: 'Cleanup `build` folder.',
        config: builder.config.task.cleanup(builder)
    };

    async function handler()
    {
        await del(task.config.src, task.config.plugin);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
