const { resolve } = require('path');
const { existsSync } = require('fs');
const { merge } = require('lodash/object');
const importModules = require('import-modules');
const args = require('yargs-parser')(process.argv.slice(2));
const { Message } = require('./util');

class Builder {

    constructor(gulp) {

        this.gulp = gulp;

        this.dir = {
            root: args.root,
            base: args.cwd
        };

        this.config = {
            name: 'dixi.config.js'
        };

        this.config.path = resolve(this.dir.base, this.config.name);

        this.task = {
            current: args._[0],
            allowed: ['init', 'run', 'build'],
            build: ['cleanup', 'buildSVG', 'buildHTML', 'buildCSS', 'buildJS', 'copyStatic']
        };

        this.isInitialized = this._isInitialized();

        global.dixiConfig = this._loadConfig();
    }

    _loadConfig() {

        let file;

        if (this.isInitialized) {

            file = this.config.path;

        } else {

            file = resolve(this.dir.root, 'data', this.config.name);
        }

        let cfg = require(file);

        cfg = this._mergeOptions(cfg);
        cfg = this._updateDefaultTasks(cfg);
        cfg = this._setBabelPresets(cfg);

        if (cfg.baseOptions.extend && typeof cfg.baseOptions.extend === 'function') {

            cfg = cfg.baseOptions.extend.call(null, cfg, this.gulp, Message);
        }

        return cfg;
    }

    _isInitialized() {

        return existsSync(this.config.path);
    }

    _mergeOptions(cfg) {

        return merge({
            builder: {
                dir: this.dir,
                task: this.task,
                isInitialized: this.isInitialized,

                enableProduction: () => {

                    const config = global.dixiConfig;

                    config.dirs.dev = config.dirs.build;

                    global.isProduction = true;
                    global.dixiConfig = config;
                }
            }
        }, cfg);
    }

    _updateDefaultTasks(cfg) {

        if (cfg.baseOptions.enableRevision) {

            cfg.builder.task.build.push('revisionAssets');
        }

        if (cfg.baseOptions.includeSources) {

            cfg.builder.task.build.push('copySource');
        }

        if (cfg.baseOptions.createArchive) {

            cfg.builder.task.build.push('createArchive');
        }

        return cfg;
    }

    _setBabelPresets(cfg) {

        const babelPresets = cfg.pluginOptions.webpack.babelLoader.presets;

        cfg.pluginOptions.webpack.babelLoader.presets = babelPresets.map((item) => {

            const preset = item;

            preset[0] = require.resolve(`babel-preset-${preset[0]}`);

            return preset;
        });

        return cfg;
    }

    loadTasks() {

        importModules('./tasks');
    }

    isAllowedTask() {

        return this.task.allowed.includes(this.task.current);
    }
}

module.exports = Builder;
