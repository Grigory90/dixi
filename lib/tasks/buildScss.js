'use strict';

const Fiber = require('fibers');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const gSass = require('gulp-sass');
const gPostcss = require('gulp-postcss');
const { src: gSrc, dest: gDest } = require('gulp');

gSass.compiler = require('sass'); 

module.exports = (builder) =>
{   
    const sourcemaps = builder.isDev;
    const { src, dest, plugin } = builder.config.taskConfig.buildScss.call(builder);

    Object.assign(plugin.sass, { fiber: Fiber });

    let stream = gSrc(src, { sourcemaps })
        .pipe(
            gSass(plugin.sass)
                .on('error', gSass.logError)
        )
        .pipe(
            gPostcss([
                autoprefixer(plugin.autoprefixer),
                builder.isProd ? cssnano(plugin.cssnano) : false
            ].filter(Boolean))
        )
        .pipe(
            gDest(dest[builder.mode], { sourcemaps })
        );

    if (builder.isDev && browserSync.has(process.pid))
    {
        stream = stream.pipe(
            browserSync.get(process.pid).stream()
        );
    }

    return stream;
};
