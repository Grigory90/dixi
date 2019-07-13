'use strict';

const gSvgSprite = require('gulp-svg-sprite');
const { src: gSrc, dest: gDest } = require('gulp');

module.exports = async (builder) =>
{
    const series = [];
    const cfg = builder.config.taskConfig.buildSvgSprite.call(builder);

    for (let { src, dest, plugin } of cfg)
    {
        const stream = gSrc(src)
            .pipe(gSvgSprite(plugin))
            .pipe(gDest(dest[builder.mode]));

        series.push(stream);
    }

    await Promise.all(series);
};
