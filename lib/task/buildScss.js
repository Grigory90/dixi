'use strict';

const bs = require('browser-sync');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
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
        const sourcemaps = (builder.isDev || task.config.sourcemaps);
        const postcssPlugins = [
            autoprefixer(Object.assign({}, task.config.plugin.autoprefixer, {
                browsers: builder.config.options.targets
            })),
            builder.isProd ? cssnano(task.config.plugin.cssnano) : false
        ];

        let stream = gulp
            .src(task.config.src, { sourcemaps })
            .pipe(sass(task.config.plugin.sass).on('error', sass.logError))
            .pipe(postcss(postcssPlugins.filter(Boolean)))
            .pipe(gulp.dest(task.config.dest[builder.mode], { sourcemaps }));

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
