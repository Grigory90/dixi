const path = require('path');
const gulp = require('gulp');
const webpack = require('webpack');

const cfg = global.dixiConfig;

function buildJS(done) {

    const options = {

        mode: global.isProduction ? 'production' : 'development',

        entry: cfg.pluginOptions.webpack.entry,

        output: {
            filename: '[name].js',
            path: path.resolve(cfg.builder.dirs.cwd, `${cfg.dirs.dev}/js`)
        },

        context: path.resolve(cfg.builder.dirs.cwd, cfg.dirs.src),

        externals: cfg.pluginOptions.webpack.externals,

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: cfg.builder.resolvePresets(cfg.pluginOptions.webpack.babelLoader)
                    }
                }
            ]
        },

        plugins: cfg.pluginOptions.webpack.plugins.call(null, webpack),

        resolveLoader: {
            modules: [
                path.resolve(cfg.builder.dirs.root, 'node_modules')
            ]
        }
    };

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
