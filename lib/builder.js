const { resolve } = require('path');
const { exec, fork } = require('child_process');
const { copySync, existsSync } = require('fs-extra');

const { Message } = require('./helper');

class Builder {

    constructor() {

        this.rootDir = resolve(__dirname, '../');
        this.baseDir = process.cwd();
        this.configName = 'dixi.config.js';
        this.config = this._loadConfig();
    }

    _loadConfig() {

        if (global.DIXI_CONFIG) {

            return global.DIXI_CONFIG;
        }

        if (!this._isInitialized()) {

            return {};
        }

        let cfg = this._getConfigData();

        cfg = this._setBabelPresets(cfg);

        if (process.env.isProduction) {

            cfg.dirs.dev = cfg.dirs.build;
        }

        cfg.dirs.builder = this.rootDir;

        global.DIXI_CONFIG = cfg;

        return cfg;
    }

    _getConfigData(onlyCheck = false) {

        const file = resolve(this.baseDir, this.configName);

        if (onlyCheck) {

            return existsSync(file);
        }

        return require(file);
    }

    _isInitialized() {

        return this._getConfigData(true);
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

    runTask(name = 'default', isProduction = '') {

        if (!this._isInitialized()) {

            Message.error('Config file not found, run `dixi init` before.');

            process.exit(1);
        }

        const gulp = `${this.rootDir}/node_modules/gulp/bin/gulp`;
        const args = ['--gulpfile', `${this.rootDir}/lib/gulpfile.js`, '--cwd', this.baseDir, '--color'];

        process.env.isProduction = isProduction;

        fork(gulp, [...args, name]);
    }

    initProject() {

        const appDir = resolve(this.baseDir, './app');

        if (this._isInitialized() || existsSync(appDir)) {

            Message.warn('The project has already been initialized.');

        } else {

            copySync(`${this.rootDir}/data`, this.baseDir);

            Message.success('The project was successfully initialized.');
        }
    }

    showHelp(argv) {

        if (argv._.length > 0) {

            Message.error('Command not found, run `dixi -h` for help.');

        } else {

            exec('dixi -h', (error, stdout) => console.log(stdout));
        }
    }

    static get cfg() {

        return new Builder().config;
    }
}

module.exports = Builder;
