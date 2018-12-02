const { resolve } = require('path');

module.exports = {
    dir: {
        src: './app/src',
        dev: './app/dev',
        build: './app/build'
    },
    options: {
        targets: ['defaults'],
        runSeries: ['server', 'observer'],
        buildSeries: [
            'cleanup',
            'buildSvgSprite',
            'buildNjk',
            'buildScss',
            'buildJs',
            'copyStatic',
            'revisionStatic',
            'bumpVersion',
            'createArchive:skip',
            'createManifest',
            'ftpDeploy:skip'
        ],
        customTasks: []
    },
    task: {
        server(builder) {
            return {
                plugin: {
                    open: false,
                    notify: false,
                    server: {
                        baseDir: builder.config.dir.dev,
                        middleware: []
                    }
                }
            };
        },
        observer(builder) {
            return {
                reloadServer: true,
                observers: [
                    {
                        glob: [`${builder.config.dir.src}/icons/**`],
                        series: ['buildSvgSprite', 'buildNjk'],
                        reload: true
                    },
                    {
                        glob: [
                            `${builder.config.dir.src}/njk/**`,
                            `${builder.config.dir.src}/data.json`
                        ],
                        series: ['buildNjk'],
                        reload: true
                    },
                    {
                        glob: [`${builder.config.dir.src}/scss/**`],
                        series: ['buildScss'],
                        reload: false
                    },
                    {
                        glob: [`${builder.config.dir.src}/static/**`],
                        series: ['copyStatic'],
                        reload: true
                    }
                ]
            };
        },
        cleanup(builder) {
            return {
                src: `${builder.config.dir.build}/**`,
                plugin: {
                    force: true
                }
            };
        },
        buildSvgSprite(builder) {
            return [
                {
                    src: `${builder.config.dir.src}/icons/**/*.svg`,
                    dest: `${builder.config.dir.src}/static/img`,
                    plugin: {
                        mode: {
                            symbol: {
                                dest: '.',
                                sprite: 'sprite.svg'
                            }
                        },
                        shape: {
                            id: {
                                separator: '-',
                                generator: 'icon-%s'
                            }
                        },
                        svg: {
                            xmlDeclaration: false,
                            doctypeDeclaration: false,
                            rootAttributes: {
                                class: 'visually-hidden'
                            }
                        }
                    }
                }
            ];
        },
        buildNjk(builder) {
            return {
                src: `${builder.config.dir.src}/njk/**/[^_]*.{njk,html}`,
                dest: {
                    production: builder.config.dir.build,
                    development: builder.config.dir.dev
                },
                dataFile: `${builder.config.dir.src}/data.json`,
                plugin: {
                    path: [
                        `${builder.config.dir.src}/njk`,
                        `${builder.config.dir.src}/static`
                    ],
                    manageEnv(env) {
                        env.addGlobal('now', new Date());
                        env.addFilter('isArray', input => Array.isArray(input));
                    }
                }
            };
        },
        buildScss(builder) {
            return {
                src: `${builder.config.dir.src}/scss/**/[^_]*.scss`,
                dest: {
                    production: `${builder.config.dir.build}/css`,
                    development: `${builder.config.dir.dev}/css`
                },
                plugin: {
                    sourcemaps: {
                        init: {},
                        write: {}
                    },
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
                    }
                }
            };
        },
        buildJs(webpack, builder) {
            return [
                {
                    mode: builder.mode,
                    context: resolve(builder.workDir, builder.config.dir.src),
                    entry: {
                        main: './js/main.js'
                    },
                    output: {
                        path: resolve(
                            builder.workDir,
                            builder.isProd ? builder.config.dir.build : builder.config.dir.dev,
                            'js'
                        )
                    },
                    module: {
                        rules: [
                            {
                                test: /\.js$/,
                                exclude: /node_modules/,
                                use: {
                                    loader: 'babel-loader',
                                    options: {
                                        presets: [
                                            [builder.resolveModule('@babel/preset-env'), {
                                                modules: false,
                                                targets: {
                                                    browsers: builder.config.options.targets
                                                },
                                            }]
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    resolveLoader: {
                        modules: [
                            resolve(builder.rootDir, 'node_modules')
                        ]
                    },
                    plugins: [
                        builder.isProd ? new webpack.BundleAnalyzerPlugin(
                            {
                                analyzerMode: 'static',
                                reportFilename: resolve(builder.workDir, builder.config.dir.build, 'BundleAnalyzerReport.html'),
                                openAnalyzer: false,
                                logLevel: 'warn'
                            }
                        ) : false
                    ].filter(Boolean)
                }
            ];
        },
        copyStatic(builder) {
            return [
                {
                    src: `${builder.config.dir.src}/static/**`,
                    dest: {
                        production: builder.config.dir.build,
                        development: builder.config.dir.dev
                    }
                }
            ];
        },
        revisionStatic(builder) {
            return {
                src: `${builder.config.dir.build}/**/*.{css,js}`,
                dest: builder.config.dir.build,
                plugin: {
                    rev: {
                        manifestPath: 'assets.json'
                    },
                    collector: {
                        replacePaths: `${builder.config.dir.build}/**/*.html`
                    }
                }
            };
        },
        bumpVersion() {
            return {
                identifiers: ['dev', 'alpha', 'beta', 'rc']
            };
        },
        createArchive(builder) {
            return {
                src: { glob: `${builder.config.dir.build}/**` },
                dest: `${builder.config.dir.build}/${builder.package.name}_v${builder.package.version}.zip`,
                plugin: {
                    zlib: {
                        level: 9
                    }
                }
            };
        },
        createManifest(builder) {
            return {
                data: {},
                dest: `${builder.config.dir.build}/app.json`
            };
        },
        ftpDeploy(builder) {
            return {
                localDir: resolve(builder.workDir, builder.config.dir.build),
                remoteDir: builder.package.name,
                plugin: {
                    port: 21,
                    secure: false,
                    verbose: false
                }
            };
        }
    }
};
