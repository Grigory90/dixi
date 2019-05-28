'use strict';

const fs = require('fs');
const glob = require('fast-glob');
const render = require('gulp-nunjucks-render');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'buildNjk',
        description: 'Compile nunjucks templates.',
        config: builder.config.task.buildNjk(builder)
    };

    function handler()
    {
        task.config.plugin.data = getData(task.config.data);

        return gulp.src(task.config.src)
            .pipe(render(task.config.plugin))
            .pipe(gulp.dest(task.config.dest[builder.mode]));
    }

    function getData(pattern)
    {
        try
        {
            return glob
                .sync(pattern)
                .reduce(mergeData, Object.create(null));
        }
        catch (err)
        {
            console.warn('Error reading data: `' + err.message.replace(/\s\s+/g, ' ') + '`.');
        }

        return Object.create(null);
    }

    function mergeData(obj, path)
    {
        return Object.assign({}, obj, JSON.parse(fs.readFileSync(path, 'utf8')));
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
