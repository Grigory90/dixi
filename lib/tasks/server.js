'use strict';

const browserSync = require('browser-sync');
const apiMocker = require('connect-api-mocker');
const { merge } = require('../utils');

module.exports = async (builder) =>
{
    const { plugin } = builder.config.taskConfig.server.call(builder);
    const config = merge(plugin, {
        server: {
            baseDir: builder.config.dir.dev,
            middleware: [
                apiMocker('/api', `${builder.config.dir.src}/api`)
            ]
        }
    });

    await new Promise((resolve) =>
    {
        browserSync
            .create(process.pid)
            .init(config, resolve);
    });
};
