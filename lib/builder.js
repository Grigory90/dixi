'use strict';

const fs = require('fs');
const path = require('path');
const { inherits } = require('util');
const chalk = require('chalk');
const dotenv = require('dotenv');
const yargsParser = require('yargs-parser');
const DefaultRegistry = require('undertaker-registry');

class Builder
{
    constructor()
    {
        this.cli = yargsParser(process.argv.slice(2));
        this.rootDir = this.cli.root;
        this.workDir = this.cli.cwd;
        this.taskDir = path.resolve(this.rootDir, 'lib/task');
        this.envFile = path.resolve(this.workDir, '.env');
        this.configFile = {
            root: path.resolve(this.rootDir, 'lib/dixi.config.js'),
            work: path.resolve(this.workDir, 'dixi.config.js')
        };
        this.packageFile = path.resolve(this.workDir, 'package.json');
        this.mode = this.cli.production ? 'production' : 'development';
        this.coreTasks = ['run', 'build', 'test'];

        this.init();
    }

    init()
    {
        this.package = this.getPkgData();
        this.config = this.getConfig();
        this.registry = this.getRegistry();
        this.env = this.getEnv();
    }

    get isProd()
    {
        return this.mode === 'production';
    }

    get isDev()
    {
        return this.mode === 'development';
    }

    get runSeries()
    {
        return this.filterTasks(this.config.options.runSeries);
    }

    get buildSeries()
    {
        return this.filterTasks(this.config.options.buildSeries);
    }

    filterTasks(tasks)
    {
        return tasks.filter(name => name.indexOf(':skip') < 0);
    }

    resolveModule(name)
    {
        return require.resolve(name, { paths: [this.rootDir, this.workDir] });
    }

    getConfig()
    {
        if (this.cli.config)
        {
            if (fs.existsSync(this.cli.config))
            {
                this.configFile.work = this.cli.config;

                return require(this.configFile.work);
            }
            else
            {
                this.log(`Config file \`${this.cli.config}\` not found.`, 'error');
                process.exit(1);
            }
        }

        if (!fs.existsSync(this.configFile.work))
        {
            this.log('Config file not found, run `di init` before.', 'error');
            process.exit(1);
        }

        return require(this.configFile.work);
    }

    getRegistry()
    {
        function Registry()
        {
            DefaultRegistry.call(this);
        }

        inherits(Registry, DefaultRegistry);

        Registry.prototype.init = (gulp) =>
        {
            this.registerTasks(gulp);

            this.config.options.customTasks.forEach(task =>
            {
                if (task && typeof task === 'function')
                {
                    task(gulp, this);
                }
            });
        };

        return new Registry();
    }

    registerTasks(gulp)
    {
        const files = this.getTaskFiles(this.taskDir);

        for (let file of files)
        {
            require(path.resolve(this.taskDir, file))(gulp, this);
        }
    }

    getTaskFiles(dir)
    {
        return fs.readdirSync(dir).filter(file => file.includes('.js'));
    }

    getPkgData()
    {
        if (!fs.existsSync(this.packageFile))
        {
            const data = { name: 'project', title: 'Project', version: '1.0.0-alpha.0' };

            fs.writeFileSync(this.packageFile, JSON.stringify(data, null, 2));

            return data;
        }

        return JSON.parse(fs.readFileSync(this.packageFile, 'utf8'));
    }

    setPkgData(data)
    {
        Object.assign(this.package, data);
        fs.writeFileSync(this.packageFile, JSON.stringify(this.package, null, 2));
    }

    getEnv()
    {
        if (fs.existsSync(this.envFile))
        {
            const env = dotenv.config({ path: this.envFile });

            if (env.error)
            {
                this.log(env.error, 'error');

                return Object.create(null);
            }

            return env;
        }

        return Object.create(null);
    }

    log(msg, type)
    {
        const date = new Date().toLocaleTimeString();
        const colors = { succes: 'green', error: 'red', info: 'cyan', warn: 'yellow' };
        const message = colors.hasOwnProperty(type) ? chalk[colors[type] + 'Bright'](msg) : msg;

        console.log(`[${chalk.gray(date)}] ${message}`);
    }
}

module.exports = Builder;
