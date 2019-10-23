'use strict';

const { existsSync } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const yargsParser = require('yargs-parser');
const { version } = require('../package.json');

const defaults = {
    taskDir: './tasks',
    cfgFile: {
        root: 'lib/dixi.config.js',
        work: 'dixi.config.js'
    }
};

class Builder
{
    constructor()
    {
        this.version = version;
        this.cli = yargsParser(process.argv.slice(2));
        this.mode = this.cli.mode;

        this.rootDir = this.cli.root;
        this.workDir = this.cli.cwd;

        this.cfgFile = {
            root: resolve(this.rootDir, defaults.cfgFile.root),
            work: resolve(this.workDir, defaults.cfgFile.work)
        };

        this.config = this.getConfig();
        this.task = this.getTasks();
    }

    getConfig()
    {
        if (this.cli.config)
        {
            if (existsSync(this.cli.config))
            {
                this.cfgFile.work = this.cli.config;

                return require(this.cfgFile.work);
            }
            else
            {
                log(`Config file \`${this.cli.config}\` not found.`, 'red');

                process.exit(1);
            }
        }

        if (!existsSync(this.cfgFile.work))
        {
            log('Config file not found, run `di init` before.', 'red');

            process.exit(1);
        }

        return require(this.cfgFile.work);
    }

    getTasks()
    {
        const result = {};
        const tasks = require(defaults.taskDir);

        for (const name in tasks)
        {
            const task = () => tasks[name].call(null, this);

            Object.defineProperty(task, 'name', { value: name });

            result[name] = task;
        }

        return result;
    }

    resolvePath(...pathSegments)
    {
        return resolve(...pathSegments);
    }

    resolveModule(name)
    {
        return require.resolve(name, { paths: [this.rootDir, this.workDir] });
    }

    get isProd()
    {
        return this.mode === 'production';
    }

    get isDev()
    {
        return this.mode === 'development';
    }
}

function log(message, color)
{   
    const date = new Date().toLocaleTimeString();
    const processedMessage = color ? chalk[`${color}Bright`](message) : message;

    console.log(chalk`
[{gray ${date}}] ${processedMessage}
    `);
}

module.exports = () => new Builder();
module.exports.version = version;
module.exports.defaults = defaults;
module.exports.log = log;
