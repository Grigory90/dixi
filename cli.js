#!/usr/bin/env node

'use strict';

const { existsSync, copyFileSync } = require('fs');
const { resolve } = require('path');
const { fork } = require('child_process');
const program = require('commander');
const chalk = require('chalk');

const dir = { root: __dirname, work: process.cwd() };
const gulpCli = resolve(dir.root, 'node_modules/gulp/bin/gulp');

program
    .name('di')
    .version(require('./package').version)
    .usage('<command> [options]');

program
    .command('init')
    .description('Copy config file to work directory.')
    .action(initProject);

program
    .command('run')
    .description('Run server and watchers.')
    .option('-c, --config <path>', 'Manually set path of config file.')
    .action(cmd => invokeGulp('run', cmd));

program
    .command('build')
    .description('Build project.')
    .option('-c, --config <path>', 'Manually set path of config file.')
    .action(cmd => invokeGulp('build', Object.assign(cmd, { production: true })));

program
    .command('tasks')
    .description('Show task list.')
    .action(() => invokeGulp('--tasks'));

program
    .command('task <name>')
    .description('Run specified task.')
    .option('-p, --production', 'Enable production mode.')
    .action(invokeGulp);

program
    .arguments('<command>')
    .action(cmd =>
    {
        console.log();
        console.log(chalk`  Unknown command \`{redBright ${cmd}}\`, run \`{cyanBright di --help}\` for reference.`);
        console.log();
    });

program.on('--help', () =>
{
    console.log();
    console.log(chalk`  Run \`{cyanBright di <command> --help}\` for reference.`);
    console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.parse(process.argv);

if (process.argv.slice(2).length < 1)
{
    program.outputHelp();
}

function invokeGulp(cmd, options = {})
{
    const args = [
        cmd,
        '--color',
        '--root', dir.root,
        '--cwd', dir.work,
        '--gulpfile', resolve(dir.root, 'index.js')
    ];

    if (options.config)
    {
        args.push('--config', resolve(options.config));
    }

    if (options.production)
    {
        args.push('--production');
    }

    fork(gulpCli, args);
}

function initProject()
{
    const cfg = {
        root: resolve(dir.root, 'lib/dixi.config.js'),
        work: resolve(dir.work, 'dixi.config.js')
    };

    if (existsSync(cfg.work))
    {
        console.log();
        console.log(chalk.yellowBright('  The configuration file already exists.'));
        console.log();

        process.exit(1);
    }

    copyFileSync(cfg.root, cfg.work);
}
