const gulp = require('gulp');

const cfg = global.dixiConfig;
const { Message } = require('../util');

function init() {

    return new Promise((resolve) => {

        if (cfg.builder.isInitialized) {

            Message.warn('The project has already been initialized.');

            return resolve();
        }

        gulp.src(`${cfg.builder.dir.root}/data/**`)
            .pipe(gulp.dest(cfg.builder.dir.base))
            .on('end', () => {

                Message.success('The project was successfully initialized.');

                resolve();
            });
    });
}

gulp.task(init);

module.exports = init;
