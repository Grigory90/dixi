const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const cfg = global.dixiConfig;

function buildJS(done) {

    const cwd = process.cwd();

    const options = {

        context: path.resolve(cwd, cfg.dirs.src),

        entry: cfg.pluginOptions.webpack.entry,

        output: {
            path: path.resolve(cwd, `${cfg.dirs.dev}/js`),
            filename: '[name].js'
        },

        externals: cfg.pluginOptions.webpack.externals,

        resolveLoader: {
            modules: [
                path.resolve(cfg.builder.dirs.root, 'node_modules')
            ]
        },

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: cfg.pluginOptions.webpack.babelLoader
                    }
                }
            ]
        },

        plugins: cfg.pluginOptions.webpack.plugins.call(null, webpack)
    };

    if (global.isProduction) {

        const plugins = [
            new UglifyJSPlugin(),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"production"` })
        ];

        options.plugins.push(...plugins);
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

            info.errors.forEach(err => console.error(err));
        }

        if (stats.hasWarnings()) {

            info.warnings.forEach(warn => console.warn(warn));
        }

        done();
    });
}

gulp.task(buildJS);

module.exports = buildJS;
