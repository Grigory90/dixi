const dirs = {
    src: '../data/app/src',
    dev: './dev',
    build: './build'
};

const baseOptions = {

    enableRevision: true,
    createArchive: true,
    includeSources: true,

    browsersList: ['last 2 versions', '> 2%', 'ie >= 11']
};

const pluginOptions = {

    twig: {},

    sass: {
        includePaths: './node_modules'
    },

    cssnano: {
        safe: true,
        calc: false,
        colormin: false,
        discardDuplicates: false,
        discardComments: {
            removeAll: true
        }
    },

    webpack: {
        entry: ['./js/main.js'],
        externals: {
            jquery: 'jQuery'
        },
        plugins: webpack => [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
            new webpack.optimize.ModuleConcatenationPlugin()
        ],
        babelLoader: {
            presets: [
                ['env', {
                    targets: {
                        browsers: baseOptions.browsersList
                    },
                    modules: false
                }]
            ]
        }
    },

    svgsprite: {
        mode: {
            symbol: {
                dest: '.',
                sprite: 'sprite.svg'
            }
        },
        shape: {
            id: {
                generator: name => `icon-${name.split('.')[0].toLowerCase()}`
            }
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
            rootAttributes: {
                style: 'position:absolute;width:0;height:0;overflow:hidden'
            }
        }
    },

    rev: {
        manifestName: 'assets.json',
        manifestOptions: {}
    },

    browsersync: {
        open: false,
        notify: false,
        server: {
            baseDir: dirs.dev
        }
    }
};

module.exports = { dirs, baseOptions, pluginOptions };
