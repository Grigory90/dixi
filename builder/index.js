import gulp from 'gulp';

import { server as taskServer } from './tasks/server';
import taskWatch from './tasks/watch';
import taskClean from './tasks/clean';
import taskTemplates from './tasks/templates';
import taskStyles from './tasks/styles';
import taskScripts from './tasks/scripts';
import taskImages from './tasks/images';
import taskSprite from './tasks/sprite';
import taskStatics from './tasks/statics';
import taskArchive from './tasks/archive';
import taskDeploy from './tasks/deploy';
import taskSizereport from './tasks/sizereport';
import taskRevision from './tasks/revision';

import cfg from './config';

gulp.task('default', gulp.series(taskServer, taskWatch));

gulp.task('build', done => {

    let tasks = [taskClean, taskSprite, taskImages, taskTemplates, taskStyles, taskScripts, taskStatics];

    if (cfg.options.revision) tasks.push(taskRevision);
    if (cfg.options.deploy) tasks.push(taskDeploy);
    if (cfg.options.zip) tasks.push(taskArchive);

    tasks.push(taskSizereport);

    const series = gulp.series(tasks);

    return series(done);
});

gulp.task(taskClean);
gulp.task(taskDeploy);

gulp.task('debug', done => {
    console.log('debug');
    return done();
});
