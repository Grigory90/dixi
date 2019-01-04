'use strict';

const fs = require('fs');
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
        task.config.plugin.data = getJsonData(task.config.dataFile);

        return gulp.src(task.config.src)
            .pipe(render(task.config.plugin))
            .pipe(gulp.dest(task.config.dest[builder.mode]));
    }

    function getJsonData(path)
    {
        try
        {
            return JSON.parse(fs.readFileSync(path, 'utf8'));
        }
        catch (err)
        {
            console.warn('Error reading data `' + err.message.replace(/\s\s+/g, ' ') + '`.');
        }

        return Object.create(null);
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
