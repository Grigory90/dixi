'use strict';

const gulp = require('gulp');
const Builder = require('./lib/builder');
const dixi = new Builder();

gulp.registry(dixi.registry);
