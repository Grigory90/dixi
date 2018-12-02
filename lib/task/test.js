'use strict';

const { inspect } = require('util');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'test',
        description: 'Test task.',
        config: {
            depth: null,
            compact: false,
            colors: true
        }
    };

    function handler()
    {
        console.log( inspect(builder, task.config) );

        return Promise.resolve();
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
