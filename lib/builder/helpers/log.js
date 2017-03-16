const chalk = require('chalk');
const moment = require('moment');

function log(str, color) {

    const print = chalk[color || 'white'];
    const stamp = moment().format('HH:mm:ss');

    console.log(`[${chalk.gray(stamp)}] ${print(str)}`);
}

module.exports = log;
