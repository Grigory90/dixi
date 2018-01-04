const chalk = require('chalk');

class Message {

    static log(str) {

        const date = new Date().toLocaleTimeString();

        console.log(`[${chalk.gray(date)}] %s`, str);
    }

    static warn(str) {

        this.log(chalk.yellow(str));
    }

    static error(str) {

        this.log(chalk.red(str));
    }

    static success(str) {

        this.log(chalk.green(str));
    }

    static info(str) {

        this.log(chalk.cyan(str));
    }
}

module.exports = { Message };
