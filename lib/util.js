const chalk = require('chalk');

class Message {

    static log(str, exitAfter = false, showTime = true) {

        let prefix = '';

        if (showTime) {

            const date = new Date().toLocaleTimeString();

            prefix = `[${chalk.gray(date)}] `;
        }

        console.log(prefix + str);

        if (exitAfter) {

            process.exit();
        }
    }

    static warn(...args) {

        args[0] = chalk.yellow(args[0]);

        this.log.apply(null, args);
    }

    static error(...args) {

        args[0] = chalk.red(args[0]);

        this.log.apply(null, args);
    }

    static success(...args) {

        args[0] = chalk.green(args[0]);

        this.log.apply(null, args);
    }

    static info(...args) {

        args[0] = chalk.cyan(args[0]);

        this.log.apply(null, args);
    }
}

module.exports = { Message };
