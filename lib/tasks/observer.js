'use strict';

const browserSync = require('browser-sync');
const { watch: gWatch, series: gSeries } = require('gulp');

module.exports = async (builder) =>
{
    const { options, observers } = builder.config.taskConfig.observer.call(builder);

    for (let observer of observers)
    {
        if (observer.reloadServer)
        {
            observer.series.push(reload);
        }

        gWatch(observer.globs, options, gSeries(...observer.series));
    }

    await Promise.resolve();
};

async function reload()
{
    browserSync
        .get(process.pid)
        .reload();

    await Promise.resolve();
}
