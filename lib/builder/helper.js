const chalk = require('chalk');
const moment = require('moment');

module.exports = {

    msg: str => console.log(`[${chalk.gray(moment().format('HH:mm:ss'))}] ${chalk.red('[BUILDER]')} ${chalk.red(str)}`)

};
