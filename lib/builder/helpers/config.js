const fs = require('fs');
const path = require('path');

const log = require('./log');

const cwd = process.cwd();

const configFile = path.resolve(cwd, './dixi.config.js');
const pkgFile = path.resolve(cwd, './package.json');

if (!fs.existsSync(configFile)) {
    log(`ERROR: Config file not found, run "dixi init" before.`, `red`);
    process.exit(1);
}

const cfg = require(configFile);

if (process.env.isProduction) {
    cfg.dirs.dev = cfg.dirs.build;
}

if (fs.existsSync(pkgFile)) {
    cfg.pkg = require(pkgFile);
}

module.exports = cfg;
