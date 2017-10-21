const fs = require('fs');
const path = require('path');

const log = require('./log');

const cwd = process.cwd();

const pkgFile = path.resolve(cwd, './package.json');
const cfgFile = path.resolve(cwd, './dixi.config.js');

if (!fs.existsSync(pkgFile)) {
    log(`ERROR: Package.json file not found, run "npm init" before.`, `red`);
    process.exit(1);
}

if (!fs.existsSync(cfgFile)) {
    log(`ERROR: Config file not found, run "dixi init" before.`, `red`);
    process.exit(1);
}

const pkg = require(pkgFile);
const cfg = require(cfgFile);

const babelPresets = cfg.pluginOptions.webpack.babelLoader.presets;

cfg.pluginOptions.webpack.babelLoader.presets = babelPresets.map(preset => {

    preset[0] = require.resolve(`babel-preset-${preset[0]}`);

    return preset;
});

if (process.env.isProduction) {
    cfg.dirs.dev = cfg.dirs.build;
}

module.exports = {cfg, pkg};
