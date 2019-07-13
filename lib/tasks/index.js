'use strict';

const cleanup = require('./cleanup');
const server = require('./server');
const observer = require('./observer');
const buildSvgSprite = require('./buildSvgSprite');
const buildNjk = require('./buildNjk');
const buildScss = require('./buildScss');
const buildJs = require('./buildJs');
const copyStatic = require('./copyStatic');
const revision = require('./revision');
const revisionReplace = require('./revisionReplace');

module.exports = {
    cleanup,
    server,
    observer,
    buildSvgSprite,
    buildNjk,
    buildScss,
    buildJs,
    copyStatic,
    revision,
    revisionReplace
};
