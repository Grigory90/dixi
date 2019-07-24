'use strict';

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

webpack.BundleAnalyzerPlugin = BundleAnalyzerPlugin;

module.exports = async (builder) =>
{
    const cfg = builder.config.taskConfig.buildJs.call(builder, webpack);

    await new Promise((resolve, reject) =>
    {
        webpack(cfg, (err, stats) =>
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
};
