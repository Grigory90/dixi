import chalk from 'chalk';
import moment from 'moment';

export default {

    argv: value => {
        let arr = process.argv;
        for (let key in arr) {
            if (arr[key] === value) return true;
        }
        return false;
    },

    msg: text => `[${chalk.gray(moment().format('HH:mm:ss'))}] ${chalk.red('[Warning]')} ${chalk.red(text)}`,

};
