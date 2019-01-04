'use strict';

const ftp = require('basic-ftp');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'ftpDeploy',
        description: 'Upload the files via FTP.',
        config: builder.config.task.ftpDeploy(builder)
    };

    async function handler()
    {
        const client = new ftp.Client();
        const config = {
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASS
        };

        Object.assign(config, task.config.plugin);

        if (config.verbose)
        {
            client.ftp.verbose = true;
        }

        try
        {
            await client.access(config);
            await client.ensureDir(task.config.remoteDir);
            await client.clearWorkingDir();
            await client.uploadDir(task.config.localDir);
        }
        catch (err)
        {
            console.log(err);
        }

        client.close();
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
