import imagemin from 'gulp-imagemin';
import rollupBabel from 'rollup-plugin-babel';
import rollupCommonjs from 'rollup-plugin-commonjs';
import rollupNodeResolve from 'rollup-plugin-node-resolve';

const dir = {
    build: './app/build',
    dist: './app/dist',
    src: './app/src'
};

const cfg = {

    app: {
        name: 'projectname',
    },

    options: {
        preproc: 'scss',
        revision: true,
        deploy: false,
        zip: true
    },

    plugins: {
        twig: {},

        less: {},

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

        rollup: {
            entry: `${dir.src}/js/main.js`,
            dest: `${dir.build}/js/main.js`,
            context: 'window',
            format: 'iife',
            globals: {
                'jquery': 'jQuery'
            },
            plugins: [
                rollupNodeResolve({
                    jsnext: true,
                    browser: true,
                    skip: ['jquery']
                }),
                rollupCommonjs(),
                rollupBabel({
                    babelrc: false,
                    presets: ['es2015-rollup'],
                    exclude: 'node_modules/**'
                })
            ]
        },

        imagemin: [
            [
                imagemin.svgo({
                    plugins: [{
                        cleanupIDs: false
                    }]
                })
            ],
            {
                verbose: true
            }
        ],

        svgsprite: {
            mode: {
                symbol: {
                    dest: '.',
                    sprite: 'sprite.svg'
                }
            },
            shape: {
                id: {
                    generator: (name, file) => `icon-${name.split('.')[0].toLowerCase()}`
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
                baseDir: dir.build
            }
        },

        ftp: {
            parallel: 10
        }
    }
};

cfg.dir = dir;

export default cfg;
