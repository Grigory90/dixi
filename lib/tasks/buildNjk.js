'use strict';

const fs = require('fs');
const glob = require('fast-glob');
const gNjkRender = require('gulp-nunjucks-render');
const { src: gSrc, dest: gDest } = require('gulp');

module.exports = (builder) =>
{
    const { src, srcData, dest, plugin } = builder.config.taskConfig.buildNjk.call(builder);
    const manageEnv = plugin.manageEnv;

    plugin.data = getData(srcData);

    plugin.manageEnv = (env) =>
    {
        env.addGlobal('isDev', builder.isDev);
        env.addGlobal('isProd', builder.isProd);

        if (manageEnv && typeof manageEnv === 'function')
        {
            manageEnv.call(null, env);
        }
    };

    return gSrc(src)
        .pipe(gNjkRender(plugin))
        .pipe(gDest(dest[builder.mode]));
};
    
function getData(pattern)
{
    const obj = Object.create(null);

    try
    {
        return glob
            .sync(pattern)
            .reduce(merge, obj);
    }
    catch (err)
    {
        console.warn('Error reading data.');
    }

    return obj;
}

function merge(obj, path)
{
    return Object.assign({}, obj, JSON.parse(fs.readFileSync(path, 'utf8')));
}
