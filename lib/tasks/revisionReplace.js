'use strict';

const { resolve } = require('path');
const gRevCollector = require('gulp-rev-collector');
const { src: gSrc, dest: gDest } = require('gulp');

module.exports = (builder) =>
{
    const { dest, plugin } = builder.config.taskConfig.revision.call(builder);

    return gSrc([resolve(dest, plugin.rev.manifestPath), plugin.collector.replacePaths])
        .pipe(gRevCollector())
        .pipe(gDest(dest));
};
