module.exports = {

    configFilename: 'dixi.config.js',

    allowedTasks: ['init', 'run', 'build'],

    buildTasks: ['cleanup', 'buildSVG', 'buildHTML', 'buildCSS', 'buildJS', 'copyStatic'],

    observers: [
        {
            glob: ['/twig/**', '/data.json'],
            series: ['buildHTML', 'reloadServer']
        },
        {
            glob: ['/scss/**'],
            series: ['buildCSS']
        },
        {
            glob: ['/js/**'],
            series: ['buildJS', 'reloadServer']
        },
        {
            glob: ['/icons/**'],
            series: ['buildSVG']
        },
        {
            glob: ['/static/**'],
            series: ['copyStatic', 'buildHTML', 'reloadServer']
        }
    ]
};
