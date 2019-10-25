#!/usr/bin/env node

'use strict';

const { existsSync, copyFileSync } = require('fs');
const { resolve } = require('path');
const { fork } = require('child_process');
const chalk = require('chalk');
const program = require('commander');

const { version, defaults, log } = require('./lib/builder');

program
    .name('di')
    .version(version)
    .usage('<command> [options]');

program
    .command('init')
    .description('Create configuration file in working directory.')
    .action(init);

program
    .command('run')
    .description('Run server and watchers.')
    .option('-c, --config <path>', 'Set path of configuration file.')
    .action((options) => invokeGulp('run', options));

program
    .command('build')
    .description('Build project.')
    .option('-c, --config <path>', 'Set path of configuration file.')
    .action((options) => invokeGulp('build', options));

program
    .on('command:*', (cmd) =>
    {
        log(chalk`Unknown command \`{redBright ${cmd}}\`, run \`{cyanBright di --help}\` for reference.`);
        process.exit(1);
    });

program
    .on('--help', () => log(chalk`Run \`{cyanBright di <command> --help}\` for reference.`));

program
    .commands
    .forEach((cmd) => cmd.on('--help', () => console.log()));

program
    .parse(process.argv);

if (process.argv.slice(2).length < 1)
{
    program.outputHelp();
}

function invokeGulp(cmd, options = {})
{
    let gulp = resolve(__dirname, 'node_modules/gulp/bin/gulp.js');
    
    gulp = existsSync(gulp) ? gulp : resolve(__dirname, '../../gulp/bin/gulp.js');

    const args = [
        cmd,
        '--color',
        '--root', __dirname,
        '--cwd', process.cwd(),
        '--gulpfile', resolve(__dirname, 'index.js'),
        '--mode', (cmd === 'run') ? 'development' : 'production'
    ];

    if (options.config)
    {
        args.push('--config', resolve(options.config));
    }
    
    fork(gulp, args);
}

function init()
{
    const rootCfg = resolve(__dirname, defaults.cfgFile.root);
    const workCfg = resolve(process.cwd(), defaults.cfgFile.work);

    if (existsSync(workCfg))
    {
        log('Configuration file already exists.', 'yellow');
        process.exit(1);
    }

    copyFileSync(rootCfg, workCfg);
}
