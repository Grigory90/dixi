'use strict';

const { createWriteStream } = require('fs');
const { basename, dirname, resolve } = require('path');
const makeDir = require('make-dir');
const archiver = require('archiver');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'createArchive',
        description: 'Create zip archive.',
        config: builder.config.task.createArchive
    };

    function handler()
    {
        const config = task.config(builder);

        makeDir.sync(dirname(config.dest));

        const stream = createWriteStream(resolve(builder.workDir, config.dest));
        const archive = archiver('zip', config.plugin);

        archive.on('warning', err =>
        {
            if (err.code === 'ENOENT')
            {
                builder.log(err.message, 'warn');
            }
            else
            {
                throw err;
            }
        });

        archive.on('error', err =>
        {
            throw err;
        });

        archive.pipe(stream);

        if (Array.isArray(config.src))
        {
            const src = config.src.filter(Boolean);

            for (let data of src)
            {
                addToArchive(archive, data);
            }
        }
        else
        {
            addToArchive(archive, config.src);
        }

        archive.finalize();

        return stream;
    }

    function addToArchive(archive, data)
    {
        archive.glob(
            basename(data.glob),
            {
                cwd: dirname(data.glob),
                ignore: '**/*.zip'
            },
            {
                prefix: data.prefix
            }
        );
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
