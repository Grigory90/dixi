const { existsSync } = require('fs');
const { resolve } = require('path');
const yargsParser = require('yargs-parser');
const { log } = require('./utils');

const defaults = require('./defaults');

class Builder
{
    constructor()
    {
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

module.exports = () => new Builder();
