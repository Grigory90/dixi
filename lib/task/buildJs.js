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

    function handler(done)
    {
        webpack(task.config(webpack, builder), (err, stats) =>
        {
            if (err)
            {
                console.error(err.stack || err);

                if (err.details)
                {
                    console.error(err.details);
                }

                return;
            }

            const info = stats.toJson();

            if (stats.hasErrors())
            {
                info.errors.forEach(err => console.error(err));
            }

            if (stats.hasWarnings())
            {
                info.warnings.forEach(warn => console.warn(warn));
            }

            done();
        });
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
