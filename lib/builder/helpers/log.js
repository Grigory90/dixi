const chalk = require('chalk');

function log(str, color) {

    const print = chalk[color || 'white'];
    const time = process.env.timestamp.toLocaleTimeString();

    console.log(`[${chalk.gray(time)}] ${print(str)}`);
}

module.exports = log;
