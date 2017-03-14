const gulp = require('gulp');

const taskServer = require('./tasks/server').init;
const taskWatch = require('./tasks/watch');
const taskClean = require('./tasks/clean');
const taskTemplates = require('./tasks/templates');
const taskStyles = require('./tasks/styles');
const taskScripts = require('./tasks/scripts');
const taskImages = require('./tasks/images');
const taskSprite = require('./tasks/sprite');
const taskStatic = require('./tasks/static');
const taskArchive = require('./tasks/archive');
const taskDeploy = require('./tasks/deploy');
const taskSizereport = require('./tasks/sizereport');
const taskRevision = require('./tasks/revision');

const cfg = require('./config');

gulp.task('default', gulp.series(taskServer, taskWatch));

gulp.task('build', done => {

    let tasks = [taskClean, taskSprite, taskImages, taskTemplates, taskStyles, taskScripts, taskStatic];

    if (cfg.baseOptions.revision) {
        tasks.push(taskRevision);
    }

    if (cfg.baseOptions.deploy) {
        tasks.push(taskDeploy);
    }

    if (cfg.baseOptions.archive) {
        tasks.push(taskArchive);
    }

    tasks.push(taskSizereport);

    const series = gulp.series(tasks);

    return series(done);
});
