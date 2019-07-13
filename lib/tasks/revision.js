'use strict';

const gRev = require('gulp-rev');
const gRevDeleteOriginal = require('gulp-rev-delete-original');
const { src: gSrc, dest: gDest } = require('gulp');

module.exports = (builder) =>
{
    const { src, dest, plugin } = builder.config.taskConfig.revision.call(builder);

    return gSrc(src)
        .pipe(gRev())
        .pipe(gRevDeleteOriginal())
        .pipe(gDest(dest))
        .pipe(gRev.manifest(plugin.rev.manifestPath))
        .pipe(gDest(dest));
};
