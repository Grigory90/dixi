'use strict';

const bs = require('browser-sync');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'buildScss',
        description: 'Compile scss files.',
        config: builder.config.task.buildScss(builder)
    };

    function handler()
    {
        const postcssPlugins = [
            autoprefixer(Object.assign({}, task.config.plugin.autoprefixer, {
                browsers: builder.config.options.targets
            })),
            builder.isProd ? cssnano(task.config.plugin.cssnano) : false
        ];

        let stream = gulp.src(task.config.src);

        if (builder.isDev || task.config.enableSourcemaps)
        {
            stream = stream.pipe(sourcemaps.init(task.config.plugin.sourcemaps.init));
        }

        stream = stream.pipe(sass(task.config.plugin.sass)
            .on('error', sass.logError))
            .pipe(postcss(postcssPlugins.filter(Boolean)));

        if (builder.isDev || task.config.enableSourcemaps)
        {
            stream = stream.pipe(sourcemaps.write(task.config.plugin.sourcemaps.write));
        }

        stream.pipe(gulp.dest(task.config.dest[builder.mode]));

        if (builder.isDev && bs.has(process.pid))
        {
            stream = stream.pipe(bs.get(process.pid).stream());
        }

        return stream;
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
