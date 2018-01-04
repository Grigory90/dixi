import { existsSync } from 'fs';
import { resolve } from 'path';
import { fork } from 'child_process';
import test from 'ava';
import del from 'del';

function dixi(args = []) {

    const modulePath = resolve(__dirname, './bin/dixi');
    const basePath = resolve(__dirname, './fixtures');

    return fork(modulePath, args, { cwd: basePath, silent: true });
}

test.cb('Run dixi without arguments', (t) => {

    const program = dixi();

    program.on('close', (code) => {

        t.deepEqual(0, code);
        t.end();
    });
});

test.cb('Run dixi [--help]', (t) => {

    let stdout;
    const program = dixi(['--help']);

    program.stdout.on('data', (buffer) => {

        stdout += buffer.toString();
    });

    program.on('close', (code) => {

        t.deepEqual(0, code);
        t.regex(stdout, /Usage: dixi <command>/);
        t.end();
    });
});

test.cb('Run dixi <build>', (t) => {

    let stdout;
    const program = dixi(['build']);

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
