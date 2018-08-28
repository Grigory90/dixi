#!/usr/bin/env node

'use strict';

const args = require('yargs-parser')(process.argv.slice(2));
const { join } = require('path');
const { fork } = require('child_process');
const pkg = require('./package.json');
const { Message } = require('./lib/util');

const isVersion = args.v || args.version;
const isHelp = args.h || args.help || args._.length < 1;

if (isVersion) {

    Message.log(`v${pkg.version}`, true, false);

} else if (isHelp) {

    const msg =
`
    Usage:
        dixi <command>

    Commands:
        dixi init     Initialize project
        dixi run      Start local server and watchers
        dixi build    Build project

    Options:
        -v, --version    Show version
        -h, --help       Show help
`;

    Message.log(msg, true, false);
}

const gulp = join(__dirname, 'node_modules/gulp/bin/gulp');
const gulpArgs = [
    '--gulpfile',
    join(__dirname, 'lib/gulpfile.js'),
    '--cwd',
    process.cwd(),
    '--root',
    __dirname,
    '--color'
];

fork(gulp, [args._[0], ...gulpArgs]);
