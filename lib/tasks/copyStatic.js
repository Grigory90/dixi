'use strict';

const gChanged = require('gulp-changed');
const { src: gSrc, dest: gDest } = require('gulp');

module.exports = async (builder) =>
{
    const series = [];
    const cfg = builder.config.taskConfig.copyStatic.call(builder);

    for (let { src, dest } of cfg)
    {
        let stream = gSrc(src);

        if (builder.isDev)
        {
            stream = stream.pipe(
                gChanged(dest[builder.mode])
            );
        }

        series.push(
            stream.pipe(
                gDest(dest[builder.mode])
            )
        );
    }

    await Promise.all(series);
};
