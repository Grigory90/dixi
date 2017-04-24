const dirs = {
    src: './app/src',
    dev: './app/dev',
    build: './app/build',
    deploy: './%s'
};

const baseOptions = {
    revision: false,
    deploy: false,
    archive: false,
    defaultName: 'project'
};

const pluginOptions = {
    twig: {},

    sass: {
        includePaths: './node_modules'
    },

    autoprefixer: {
        browsers: ['ie >= 10', 'last 2 versions', '> 2%']
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
        providePlugin: {
            $: 'jquery',
            jQuery: 'jquery'
        }
    },

    imagemin: {},

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

    revall: {
        dontRenameFile: ['.html'],
        fileNameManifest: 'manifest.json'
    },

    sizereport: {
        gzip: true
    },

    browsersync: {
        open: false,
        notify: false,
        server: {
            baseDir: dirs.dev
        }
    },

    ftp: {
        parallel: 10,
        host: '',
        user: '',
        password: ''
    }
};

module.exports = {dirs, baseOptions, pluginOptions};
