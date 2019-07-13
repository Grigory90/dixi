'use strict';

const builder = require('./lib/builder')();
const { series, parallel } = require('gulp');

builder.series = series;
builder.parallel = parallel;

exports.run = series(...builder.config.runSeries.call(builder));
exports.build = series(...builder.config.buildSeries.call(builder));
