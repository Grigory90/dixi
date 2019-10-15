module.exports = {
    dir: {
        src: './app/src',
        dev: './app/dev',
        build: './app/build'
    },
    browserslist: [
        'defaults'
    ],
    runSeries() {
        return [
            this.parallel(
                this.task.cleanup,
                this.task.server,
            ),
            this.task.observer
        ];
    },
    buildSeries() {
        return [
            this.task.cleanup,
            this.parallel(
                this.task.buildSvgSprite,
                this.task.buildNjk,
                this.task.buildScss,
                this.task.buildJs,
                this.task.copyStatic
            ),
            this.task.revision,
            this.task.revisionReplace
        ];
    },
    taskConfig: {
        cleanup() {
            return [
                {
                    src: {
                        production: `${this.config.dir.build}/**`,
                        development: `${this.config.dir.dev}/**`
                    },
                    plugin: {
                        force: true
                    }
                }
            ];
        },
        server() {
            return {
                plugin: {
                    open: false,
                    notify: false,
                    ghostMode: false,
                    server: {
                        baseDir: this.config.dir.dev
                    }
                }
            };
        },
        observer() {
            return {
                options: {
                    ignoreInitial: false
                },
                observers: [
                    {
                        globs: `${this.config.dir.src}/icons/**`,
                        series: [
                            this.task.buildSvgSprite
                        ],
                        reloadServer: true
                    },
                    {
                        globs: [
                            `${this.config.dir.src}/njk/**`,
                            `${this.config.dir.src}/data/**`,
                            `${this.config.dir.src}/*.json`
                        ],
                        series: [
                            this.task.buildNjk
                        ],
                        reloadServer: true
                    },
                    {
                        globs: `${this.config.dir.src}/scss/**`,
                        series: [
                            this.task.buildScss
                        ],
                        reloadServer: false
                    },
                    {
                        globs: `${this.config.dir.src}/js/**`,
                        series: [
                            this.task.buildJs
                        ],
                        reloadServer: true
                    },
                    {
                        globs: `${this.config.dir.src}/static/**`,
                        series: [
                            this.task.copyStatic
                        ],
                        reloadServer: true
                    }
                ]
            };
        },
        buildSvgSprite() {
            return [
                {
                    src: `${this.config.dir.src}/icons/**/*.svg`,
                    dest: {
                        production: `${this.config.dir.build}/img`,
                        development: `${this.config.dir.dev}/img`
                    },
                    plugin: {
                        mode: {
                            symbol: {
                                dest: '.',
                                sprite: 'icons.svg'
                            }
                        },
                        shape: {
                            id: {
                                separator: '-'
                            }
                        },
                        svg: {
                            xmlDeclaration: false,
                            doctypeDeclaration: false
                        }
                    }
                }
            ];
        },
        buildNjk() {
            return {
                src: `${this.config.dir.src}/njk/**/[^_]*.njk`,
                srcData: `${this.config.dir.src}/data.json`,
                dest: {
                    production: this.config.dir.build,
                    development: this.config.dir.dev
                },
                plugin: {
                    path: [
                        `${this.config.dir.src}/njk`
                    ]
                }
            };
        },
        buildScss() {
            return {
                src: `${this.config.dir.src}/scss/**/[^_]*.scss`,
                dest: {
                    production: `${this.config.dir.build}/css`,
                    development: `${this.config.dir.dev}/css`
                },
                plugin: {
                    sass: {
                        includePaths: './node_modules'
                    },
                    autoprefixer: {
                        cascade: false,
                        overrideBrowserslist: this.config.browserslist
                    },
                    cssnano: {
                        preset: [
                            'default',
                            {
                                calc: false,
                                colormin: false,
                                discardDuplicates: false,
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        ]
                    }
                }
            };
        },
        buildJs(webpack) {
            return [
                {
                    mode: this.mode,
                    context: this.resolvePath(this.workDir, this.config.dir.src),
                    entry: {
                        main: './js/main.js'
                    },
                    output: {
                        path: this.resolvePath(
                            this.workDir,
                            this.isProd ? this.config.dir.build : this.config.dir.dev,
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
                                            [
                                                this.resolveModule('@babel/preset-env'),
                                                {
                                                    modules: false,
                                                    targets: {
                                                        browsers: this.config.browserslist
                                                    }
                                                }
                                            ]
                                        ]
                                    }
                                }
                            }
                        ]
                    },
                    resolveLoader: {
                        modules: [
                            this.resolvePath(this.workDir, 'node_modules'),
                            this.resolvePath(this.rootDir, 'node_modules')
                        ]
                    },
                    optimization: {
                        runtimeChunk: 'single',
                        splitChunks: {
                            cacheGroups: {
                                vendors: {
                                    test: /[\\/]node_modules[\\/]/,
                                    name: 'vendors',
                                    chunks: 'all',
                                    enforce: true
                                }
                            }
                        }
                    },
                    plugins: [
                        this.isProd ? new webpack.BundleAnalyzerPlugin(
                            {
                                analyzerMode: 'static',
                                reportFilename: this.resolvePath(this.workDir, this.config.dir.build, '__BundleAnalyzerReport__.html'),
                                openAnalyzer: false,
                                logLevel: 'warn'
                            }
                        ) : false
                    ].filter(Boolean)
                }
            ];
        },
        copyStatic() {
            return [
                {
                    src: `${this.config.dir.src}/static/**`,
                    dest: {
                        production: this.config.dir.build,
                        development: this.config.dir.dev
                    }
                }
            ];
        },
        revision() {
            return {
                src: [
                    `${this.config.dir.build}/**/*.{css,js}`,
                    `${this.config.dir.build}/**/icons.svg`
                ],
                dest: this.config.dir.build,
                plugin: {
                    rev: {
                        manifestPath: 'assets.json'
                    },
                    collector: {
                        replacePaths: `${this.config.dir.build}/**/*.html`
                    }
                }
            };
        }
    }
};
