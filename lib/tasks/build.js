const gulp = require('gulp');

const cleanDir = require('./clean');
const buildHTML = require('./templates');
const buildCSS = require('./styles');
const buildJS = require('./scripts');
const buildSVG = require('./sprite');
const createArchive = require('./archive');
const sizeReport = require('./sizereport');
const revisionAssets = require('./revision');
const { copyStatic, copySource } = require('./copy');

const { cfg } = require('../builder');

function build(done) {

    process.env.timestamp = new Date();

    const tasks = [
        cleanDir,
        buildSVG,
        buildHTML,
        buildCSS,
        buildJS,
        copyStatic
    ];

    if (cfg.baseOptions.enableRevision) {
        tasks.push(revisionAssets);
    }

    if (cfg.baseOptions.includeSources) {
        tasks.push(copySource);
    }

    if (cfg.baseOptions.createArchive) {
        tasks.push(createArchive);
    }

    tasks.push(sizeReport);

    const series = gulp.series(tasks);

    return series(done);
}

module.exports = build;
