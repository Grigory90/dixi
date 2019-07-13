'use strict';

const del = require('del');

module.exports = async (builder) =>
{
    const series = [];
    const cfg = builder.config.taskConfig.cleanup.call(builder);

    for (let { src, plugin } of cfg)
    {
        series.push(
            del(src[builder.mode], plugin)
        );
    }

    await Promise.all(series);
};
