'use strict';

const semver = require('semver');
const inquirer = require('inquirer');

module.exports = (gulp, builder) =>
{
    const task = {
        name: 'bumpVersion',
        description: 'Bump project version.',
        config: builder.config.task.bumpVersion(builder)
    };

    async function handler()
    {
        if (task.config.auto)
        {
            const version = prepareVersion({
                release: task.config.autoParams[0],
                identifier: task.config.autoParams[1]
            });

            setPkg(version);

            return Promise.resolve();
        }

        await inquirer
            .prompt(questions.selectVersion)
            .then(prepareVersion)
            .then(confirmBump);
    }

    const pre = ['prepatch', 'preminor', 'premajor', 'prerelease'];
    const questions = {
        selectVersion: [
            {
                type: 'rawlist',
                name: 'release',
                message: `Select release type (current ${builder.package.version})`,
                choices: ['patch', 'minor', 'major', ...pre],
                pageSize: 8
            },
            {
                type: 'rawlist',
                name: 'identifier',
                message: 'Select identifier',
                choices: task.config.identifiers,
                when(answers) {
                    return pre.includes(answers.release);
                }
            }
        ],
        confirm(version) {
            return [
                {
                    type: 'confirm',
                    name: 'update',
                    message: `Update ${builder.package.version} to ${version}?`,
                    default: false
                }
            ];
        }
    };

    function prepareVersion(answers)
    {
        return {
            val: semver.inc(builder.package.version, answers.release, answers.identifier),
            type: answers.identifier || 'stable'
        };
    }

    function confirmBump(version)
    {
        return inquirer
            .prompt(questions.confirm(version.val))
            .then(answer => {
                return answer.update ? setPkg(version) : handler();
            });
    }

    function setPkg(version)
    {
        builder.setPkgData({ version: version.val });
    }

    handler.displayName = task.name;
    handler.description = task.description;

    gulp.task(handler);

    return handler;
};
