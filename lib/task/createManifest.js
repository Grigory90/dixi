'use strict';

const { writeFileSync } = require('fs');
const glob = require('glob');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'createManifest',
        description: 'Create manifest file.',
        config: builder.config.task.createManifest(builder)
    };

    function handler()
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

        writeFileSync(task.config.dest, JSON.stringify(manifest, null, 2));

        return Promise.resolve();
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
