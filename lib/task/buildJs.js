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
        const config = task.config(webpack, builder);

        await new Promise((resolve, reject) =>
        {
            webpack(config, (err, stats) =>
            {
                if (err)
                {
                    console.log(err.stack || err);

                    if (err.details)
                    {
                        console.log(err.details);
                    }

                    reject(err);
                }

                const info = stats.toJson();

                if (stats.hasErrors())
                {
                    console.log(info.errors);
                }

                if (stats.hasWarnings())
                {
                    console.log(info.warnings);
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
