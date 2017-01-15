/**
 * Dependencies
 */
const fs = require('fs');
const ftp = require('vinyl-ftp');
const del = require('del');
const rev = require('gulp-rev-all');
const zip = require('gulp-zip');
const gulp = require('gulp');
const twig = require('gulp-twig');
const sass = require('gulp-sass');
const less = require('gulp-less');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const chalk = require('chalk');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const moment = require('moment');
const revdel = require('gulp-rev-delete-original');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const sequence = require('gulp-sequence');
const svgsprite = require('gulp-svg-sprite');
const sizereport = require('gulp-sizereport');
const sourcemaps = require('gulp-sourcemaps');
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const rollup = require('rollup').rollup;
const rollupBabel = require('rollup-plugin-babel');
const rollupUglify = require('rollup-plugin-uglify');
const rollupCommonjs = require('rollup-plugin-commonjs');
const rollupNodeResolve = require('rollup-plugin-node-resolve');

/**
 * Init
 */
const Helper = {
    argv: value => {
        let arr = process.argv;
        for (let key in arr) {
            if (arr[key] === value) return true;
        }
        return false;
    },
    msg: text => {
        return `[${chalk.gray(moment().format('HH:mm:ss'))}] ${chalk.red('[Warning]')} ${chalk.red(text)}`;
    }
};
const cfg = require('./config.json');
let isProduction = false;
let tasks = {
    default: ['server', 'watch'],
    build: ['clean', 'html', 'css', 'js', 'sprite', 'images', 'static']
};

/**
 * Tasks
 */
gulp.task('default', sequence(tasks.default));

gulp.task('build', callback => {
    isProduction = true;
    cfg.dirs.build = cfg.dirs.dist;
    if (cfg.options.revision) tasks.build.push('revision');
    if (cfg.options.deploy) tasks.build.push('deploy');
    if (cfg.options.zip) tasks.build.push('zip');
    tasks.build.push('sizereport');
    sequence(...tasks.build, callback);
});

gulp.task('server', () => {
    let options = Object.assign({
        server: {
            baseDir: cfg.dirs.build
        }
    }, cfg.plugins.browsersync);
    browsersync.init(options);
});

gulp.task('watch', () => {
    watch(`${cfg.dirs.src}/html/**/*.{html,twig,json}`, () => {
        sequence('html', browsersync.reload)(err => {
            if (err) throw err;
        });
    });
    watch(`${cfg.dirs.src}/${cfg.options.preproc}/**/*.${cfg.options.preproc}`, () => {
        sequence('css')(err => {
            if (err) throw err;
        });
    });
    watch(`${cfg.dirs.src}/js/**/*.js`, () => {
        sequence('js', browsersync.reload)(err => {
            if (err) throw err;
        });
    });
    watch(`${cfg.dirs.src}/icons/**/*.svg`, () => {
        sequence('sprite', 'html')(err => {
            if (err) throw err;
        });
    });
    watch(`${cfg.dirs.src}/img/**/*.*`, () => {
        sequence('images', browsersync.reload)(err => {
            if (err) throw err;
        });
    });
    watch(`${cfg.dirs.src}/static/**/*.*`, () => {
        sequence('static', browsersync.reload)(err => {
            if (err) throw err;
        });
    });
});

gulp.task('clean', () => del.sync([`${cfg.dirs.dist}/**`, `!${cfg.dirs.dist}`]));

gulp.task('html', () => {
    let options = (() => {
        let file = `${cfg.dirs.src}/html/data.json`;
        if (fs.existsSync(file)) {
            return {
                data: JSON.parse(fs.readFileSync(file, 'utf-8'))
            };
        }
        return {};
    })();
    options = Object.assign(options, cfg.plugins.twig);
    return gulp.src(`${cfg.dirs.src}/html/**/[^_]*.{html,twig}`)
        .pipe(plumber())
        .pipe(twig(options))
        .pipe(gulp.dest(cfg.dirs.build));
});

gulp.task('css', callback => {
    let stream = gulp.src(`${cfg.dirs.src}/${cfg.options.preproc}/**/[^_]*.${cfg.options.preproc}`)
        .pipe(plumber(function(err) {
            console.log(err);
            this.emit('end');
            this.destroy();
        }));
    if (!isProduction) stream = stream.pipe(sourcemaps.init());
    if (cfg.options.preproc === 'sass' || cfg.options.preproc === 'scss') {
        stream = stream.pipe(sass(cfg.plugins.sass));
    } else if (cfg.options.preproc === 'less') {
        stream = stream.pipe(less(cfg.plugins.less));
    } else {
        console.log(Helper.msg('css preprocessor not found, this task will be skipped'));
        return callback();
    }
    stream = stream.pipe(autoprefixer(cfg.plugins.autoprefixer));
    if (isProduction && !Helper.argv('--dev')) stream = stream.pipe(cssnano(cfg.plugins.cssnano));
    if (!isProduction) stream = stream.pipe(sourcemaps.write());
    return stream.pipe(gulp.dest(`${cfg.dirs.build}/css`))
        .pipe(browsersync.stream());
});

gulp.task('js', () => {
    if (cfg.options.bundle) {
        let options = Object.assign({
            entry: `${cfg.dirs.src}/js/main.js`,
            dest: `${cfg.dirs.build}/js/main.js`,
            plugins: [
                rollupNodeResolve({
                    jsnext: true,
                    browser: true,
                    skip: ['jquery']
                }),
                rollupCommonjs()
            ]
        }, cfg.plugins.rollup);
        if (cfg.options.babel) {
            options.plugins.unshift(
                rollupBabel({
                    exclude: 'node_modules/**'
                })
            );
        }
        if (isProduction && !Helper.argv('--dev')) options.plugins.push(rollupUglify());
        return rollup(options)
            .then(bundle => bundle.write(options))
            .then(() => browsersync.reload);
    }
    let stream = gulp.src([`${cfg.dirs.src}/js/**/[^_]*.js`, `${cfg.dirs.src}/js/vendor{,/**}`]);
    if (cfg.options.babel) stream = stream.pipe(babel());
    stream = stream.pipe(concat('main.js'));
    if (isProduction && !Helper.argv('--dev')) stream = stream.pipe(uglify());
    return stream.pipe(gulp.dest(`${cfg.dirs.build}/js`))
        .pipe(browsersync.stream());
});

gulp.task('images', () => {
    let dest = `${cfg.dirs.build}/img`;
    let stream = gulp.src(`${cfg.dirs.src}/img/**/*.{svg,png,jpg,gif,ico}`);
    if (!isProduction) stream = stream.pipe(changed(dest));
    if (isProduction) {
        stream = stream.pipe(imagemin([
            imagemin.svgo({
                plugins: [{cleanupIDs: false}]
            })
        ], cfg.plugins.imagemin));
    }
    return stream.pipe(gulp.dest(dest))
        .pipe(browsersync.stream());
});

gulp.task('sprite', () => {
    return gulp.src(`${cfg.dirs.src}/icons/**/*.svg`)
        .pipe(svgsprite(cfg.plugins.svgsprite))
        .pipe(gulp.dest(`${cfg.dirs.src}/img`));
});

gulp.task('static', () => {
    let dest = cfg.dirs.build;
    let stream = gulp.src(`${cfg.dirs.src}/static/**`);
    if (!isProduction) stream = stream.pipe(changed(dest));
    return stream.pipe(gulp.dest(dest));
});

gulp.task('revision', () => {
    let stream = gulp.src([
            `${cfg.dirs.build}/**/*.{html,css,js}`,
            `!${cfg.dirs.build}/css/vendor{,/**}`,
            `!${cfg.dirs.build}/js/vendor{,/**}`
        ])
    	.pipe(rev.revision({
    		dontRenameFile: ['.html']
    	}))
    	.pipe(revdel())
    	.pipe(gulp.dest(cfg.dirs.build));
    if (cfg.options.manifest) stream = stream.pipe(rev.manifestFile()).pipe(gulp.dest(cfg.dirs.build));
    return stream;
});

gulp.task('deploy', callback => {
    let file = './ftp.json';
    if (!fs.existsSync(file)) {
        console.log(Helper.msg('ftp.json file not found, this task will be skipped'));
        return callback();
    }
    let options = Object.assign(JSON.parse(fs.readFileSync(file, 'utf-8')), cfg.plugins.ftp);
    let connect = ftp.create(options);
    return gulp.src(`${cfg.dirs.dist}/**`, {base: cfg.dirs.dist, buffer: false})
        .pipe(connect.dest(`./${cfg.app.name}`));
});

gulp.task('zip', () => {
    let filename = `${cfg.app.name}_${moment().format('HHmmss_DDMMYYYY')}`;
    return gulp.src(`${cfg.dirs.build}/**`, {base: cfg.dirs.build})
        .pipe(zip(`${filename}.zip`))
        .pipe(gulp.dest(cfg.dirs.build));
});

gulp.task('sizereport', () => {
    return gulp.src([`${cfg.dirs.build}/js/*.js`, `${cfg.dirs.build}/css/*.css`])
        .pipe(sizereport({
            gzip: true
        }));
});

gulp.task('debug', callback => {
    console.log('debug');
    return callback();
});
