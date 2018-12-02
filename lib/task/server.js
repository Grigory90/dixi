'use strict';

const bs = require('browser-sync');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'server',
        description: 'Start local server.',
        config: builder.config.task.server(builder)
    };

    function handler(done)
    {
        bs.create(process.pid).init(task.config.plugin, done);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
