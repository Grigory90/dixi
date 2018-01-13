'use strict';

const gulp = require('gulp');
const Builder = require('./builder');
const { Message } = require('./util');

const builder = new Builder(gulp);

builder.loadTasks();

if (builder.isAllowedTask()) {

    if (builder.task.current === 'init' || builder.isInitialized) {

        gulp.task.call(null, builder.task.current);

    } else {

        Message.error('Config file not found, run `dixi init` before.', true);
    }

} else {

    Message.error('Command not found, run `dixi -h` for help.', true);
}
