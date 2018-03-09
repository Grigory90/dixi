const path = require('path');
const { existsSync } = require('fs');
const importModules = require('import-modules');
const args = require('yargs-parser')(process.argv.slice(2));

const { Message } = require('./util');
const Defaults = require('./defaults');

class Builder {

    constructor(gulp) {

        this.gulp = gulp;

        this.dirs = {
            root: args.root,
            base: args.cwd
        };

        this.configFile = path.resolve(this.dirs.base, Defaults.configFilename);

        this.currentTask = args._[0];

        this.tasks = {
            allowed: Defaults.allowedTasks,
            build: Defaults.buildTasks
        };

        this.isInitialized = existsSync(this.configFile);

        global.dixiConfig = this._loadConfig();
    }

    _loadConfig() {

        let file;

        if (this.isInitialized) {

            file = this.configFile;

        } else {

            file = path.resolve(this.dirs.root, 'data', Defaults.configFilename);
        }

        let cfg = require(file);

        cfg.builder = {
            dirs: this.dirs,
            tasks: this._setDefaultTasks(cfg),
            observers: Defaults.observers,
            isInitialized: this.isInitialized,

            enableProduction: () => {

                const config = global.dixiConfig;

                config.dirs.dev = config.dirs.build;

                global.isProduction = true;
                global.dixiConfig = config;
            }
        };

        cfg = this._setBabelPresets(cfg);

        if (cfg.baseOptions.extend && typeof cfg.baseOptions.extend === 'function') {

            cfg = cfg.baseOptions.extend.call(null, cfg, this.gulp, Message);
        }

        return cfg;
    }

    _setDefaultTasks(cfg) {

        if (cfg.baseOptions.enableRevision) {

            this.tasks.build.push('revisionAssets');
        }

        if (cfg.baseOptions.includeSources) {

            this.tasks.build.push('copySource');
        }

        if (cfg.baseOptions.createArchive) {

            this.tasks.build.push('createArchive');
        }

        return this.tasks;
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

        return this.tasks.allowed.includes(this.currentTask);
    }
}

module.exports = Builder;
