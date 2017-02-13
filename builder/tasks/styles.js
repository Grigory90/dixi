import gulp from 'gulp';
import sass from 'gulp-sass';
import less from 'gulp-less';
import cssnano from 'gulp-cssnano';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

import { browsersync } from './server';
import helper from '../helper';

import cfg from '../config';

function styles(done) {

    let stream = gulp.src(`${cfg.dirs.src}/${cfg.options.preproc}/**/[^_]*.${cfg.options.preproc}`)
        .pipe(plumber(function(err) {
            console.log(err);
            this.emit('end');
            this.destroy();
        }));

    if (!cfg.builder.prod) stream = stream.pipe(sourcemaps.init());

    if (cfg.options.preproc === 'sass' || cfg.options.preproc === 'scss') {
        stream = stream.pipe(sass(cfg.plugins.sass));
    } else if (cfg.options.preproc === 'less') {
        stream = stream.pipe(less(cfg.plugins.less));
    } else {
        console.log(helper.msg('css preprocessor not found, this task will be skipped'));
        return done();
    }

    stream = stream.pipe(autoprefixer(cfg.plugins.autoprefixer));

    if (cfg.builder.prod) stream = stream.pipe(cssnano(cfg.plugins.cssnano));

    if (!cfg.builder.prod) stream = stream.pipe(sourcemaps.write());

    return stream.pipe(gulp.dest(`${cfg.dirs.build}/css`))
        .pipe(browsersync.stream());
}

export default styles;
