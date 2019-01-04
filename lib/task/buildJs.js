'use strict';

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

webpack.BundleAnalyzerPlugin = BundleAnalyzerPlugin;

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'buildJs',
        description: 'Build js using webpack and babel.',
        config: builder.config.task.buildJs
    };

    async function handler()
    {
        await build();
    }

    function build()
    {
        return new Promise((resolve, reject) =>
        {
            const config = task.config(webpack, builder);

            webpack(config, (err, stats) =>
            {
                if (err)
                {
                    console.error(err.stack || err);

                    if (err.details)
                    {
                        console.error(err.details);
                    }

                    reject(err);
                }

                const info = stats.toJson();

                if (stats.hasErrors())
                {
                    console.error(info.errors);
                }

                if (stats.hasWarnings())
                {
                    console.warn(info.warnings);
                }

                resolve();
            });
        });
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
