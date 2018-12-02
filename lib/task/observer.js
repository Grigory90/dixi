'use strict';

const bs = require('browser-sync');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'observer',
        description: 'Monitoring files and launches related tasks.',
        config: builder.config.task.observer(builder)
    };

    function handler()
    {
        for (let observer of task.config.observers)
        {
            if (task.config.reloadServer && observer.reload)
            {
                observer.series.push(reload);
            }

            gulp.watch(observer.glob, gulp.series(observer.series));
        }

        return Promise.resolve();
    }

    function reload()
    {
        bs.get(process.pid).reload();

        return Promise.resolve();
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
