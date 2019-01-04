'use strict';

const glob = require('glob');
const { promisify } = require('util');
const { writeFile } = require('fs');
const writeFileAsync = promisify(writeFile);

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'createManifest',
        description: 'Create manifest file.',
        config: builder.config.task.createManifest(builder)
    };

    async function handler()
    {
        const manifest = {
            name: builder.package.name,
            title: builder.package.title || builder.package.name,
            version: builder.package.version,
            buildDate: new Date().toUTCString(),
            pages: glob.sync('**/*.html', {
                cwd: builder.config.dir.build,
                ignore: 'BundleAnalyzerReport.html'
            })
        };

        Object.assign(manifest, task.config.data);

        try
        {
            await writeFileAsync(task.config.dest, JSON.stringify(manifest, null, 2));
        }
        catch (err)
        {
            console.log(err);
        }
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
