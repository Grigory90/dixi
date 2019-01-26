'use strict';

const bs = require('browser-sync');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'observer',
        description: 'Monitoring files and launches related tasks.',
        config: builder.config.task.observer(builder)
    };

    async function handler()
    {
        for (let observer of task.config.observers)
        {
            if (task.config.reloadServer && observer.reload)
            {
                observer.series.push(reload);
            }

            gulp.watch(observer.glob, { ignoreInitial: false }, gulp.series(observer.series));
        }

        await Promise.resolve();
    }

    async function reload()
    {
        bs.get(process.pid).reload();

        await Promise.resolve();
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
