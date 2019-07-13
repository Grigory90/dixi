'use strict';

const browserSync = require('browser-sync');

module.exports = async (builder) =>
{
    const { plugin } = builder.config.taskConfig.server.call(builder);

    await new Promise((resolve) =>
    {
        browserSync
            .create(process.pid)
            .init(plugin, resolve);
    });
    
};
