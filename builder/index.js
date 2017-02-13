import gulp from 'gulp';

import { server as taskServer } from './tasks/server';
import taskWatch from './tasks/watch';
import taskClean from './tasks/clean';
import taskTemplates from './tasks/templates';
import taskStyles from './tasks/styles';
import taskScripts from './tasks/scripts';
import taskImages from './tasks/images';
import taskSprite from './tasks/sprite';
import taskStatic from './tasks/static';
import taskArchive from './tasks/archive';
import taskDeploy from './tasks/deploy';
import taskSizereport from './tasks/sizereport';
import taskRevision from './tasks/revision';

import cfg from './config';

gulp.task('default', gulp.series(taskServer, taskWatch));

gulp.task('build', () => {
    let tasks = [taskClean, taskTemplates, taskStyles, taskScripts, taskImages, taskSprite, taskStatic];
    if (cfg.options.revision) tasks.build.push(taskRevision);
    if (cfg.options.deploy) tasks.build.push(taskDeploy);
    tasks.push(taskSizereport);
    gulp.series(tasks);
});

gulp.task('debug', done => {
    console.log('debug');
    return done();
});
