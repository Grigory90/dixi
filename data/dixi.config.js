const dirs = {
    src: './app/src',
    dev: './app/dev',
    build: './app/build'
};

const baseOptions = {

    enableRevision: false,
    createArchive: false,
    includeSources: false,

    browsersList: ['last 2 versions', '> 2%', 'ie >= 11'],

    extend: null
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
            })
        ],
        babelLoader: {
            presets: [
                ['@babel/preset-env', {
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
                class: 'visually-hidden'
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
