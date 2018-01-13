import { existsSync } from 'fs';
import { join } from 'path';
import { fork } from 'child_process';
import test from 'ava';
import del from 'del';

function dixi(...args) {

    const modPath = join(__dirname, 'cli.js');
    const cwdPath = join(__dirname, 'fixtures');

    return fork(modPath, args, { cwd: cwdPath, silent: true });
}

test.cb('Run dixi without arguments', (t) => {

    let stdout = '';
    const program = dixi();

    program.stdout.on('data', (buffer) => {

        stdout = buffer.toString();
    });

    program.on('close', (code) => {

        t.deepEqual(0, code);
        t.regex(stdout, /Usage:\n\s{8}dixi <command>/);
        t.end();
    });
});

test.cb('Run dixi [--help]', (t) => {

    let stdout = '';
    const program = dixi('--help');

    program.stdout.on('data', (buffer) => {

        stdout = buffer.toString();
    });

    program.on('close', (code) => {

        t.deepEqual(0, code);
        t.regex(stdout, /Usage:\n\s{8}dixi <command>/);
        t.end();
    });
});

test.cb('Run dixi <build>', (t) => {

    let stdout = '';
    const program = dixi('build');

    program.stdout.on('data', (buffer) => {

        stdout += buffer.toString();
    });

    program.on('close', (code) => {

        t.deepEqual(0, code);
        t.regex(stdout, /Finished '\u001b\[36mbuild\u001b\[39m' after/);
        t.true(existsSync('./fixtures/build'));
        t.end();
    });
});

test.after('Cleanup', () => {

    return del(['./fixtures/build/**', './fixtures/dev/**']);
});
