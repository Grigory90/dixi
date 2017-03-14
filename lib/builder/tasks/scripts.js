const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const cfg = require('../config');

function scripts(done) {

    let options = {

        context: path.resolve(process.cwd(), cfg.dirs.src),

        entry: cfg.pluginOptions.webpack.entry,

        output: {
            path: path.resolve(process.cwd(), `${cfg.dirs.dev}/js`),
            filename: '[name].js'
        },

        externals: cfg.pluginOptions.webpack.externals,

        resolveLoader: {
            modules: [
                path.resolve(process.env.cliRoot, 'node_modules')
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: `babel-loader?presets[]=${require.resolve('babel-preset-es2015')}`,
                    exclude: /node_modules/
                }
            ]
        },

        plugins: [
            new webpack.ProvidePlugin(cfg.pluginOptions.webpack.providePlugin)
        ]

    };

    if (process.env.isProduction) {
        options.plugins.push(new UglifyJSPlugin());
    }

    webpack(options, (err, stats) => {

        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            return;
        }

        const info = stats.toJson();

        if (stats.hasErrors()) {
            console.error(info.errors);
        }

        if (stats.hasWarnings()) {
            console.warn(info.warnings);
        }

        done();
    });
}

module.exports = scripts;
