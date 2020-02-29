const chalk = require('chalk');
const mergeWith = require('lodash.mergewith');
const { version } = require('../package.json');

const log = (message, color) =>
{
    const date = new Date().toLocaleTimeString();
    const processedMessage = color ? chalk[`${color}Bright`](message) : message;

    console.log(chalk`
[{gray ${date}}] ${processedMessage}
    `);
};

const merge = (...sources) =>
{
    return mergeWith(...sources, (objValue, srcValue) =>
    {
        if (Array.isArray(objValue))
        {
            return objValue.concat(srcValue);
        }
    });
};

module.exports = {
    log,
    merge,
    version
};
