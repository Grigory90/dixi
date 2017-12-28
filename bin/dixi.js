#!/usr/bin/env node

'use strict';

const program = require('yargs');
const Builder = require('../lib/builder');

const builder = new Builder();

program.locale('en');

program.usage('Usage: dixi <command>');

program.command('init', 'Initialize project', () => builder.initProject());
program.command('run', 'Start local server and watchers', {}, () => builder.runTask());
program.command('build', 'Build project', {}, () => builder.runTask('build', true));
program.command('*', false, {}, argv => builder.showHelp(argv));

program.help('h');

program.alias('h', 'help');
program.alias('v', 'version');

program.demandCommand(1);

program.parse(program.argv._);
