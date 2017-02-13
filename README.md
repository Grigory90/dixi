# Project Builder

Simply project builder based on Gulp.

## Installation

Clone repo:

`git clone git://github.com/grigory90/project-builder.git projectname`

install dependencies:

`cd projectname && npm i`

**NOTE:** if you haven't used `Gulp` before, you need to install the gulp package as a global install, `npm i gulp-cli -g`.

## Configuration

See **app/config.js** file and adjust if necessary.

## Usage

`npm start` --- start watchers.

`npm run build` --- build project.

`npm run deploy` --- deploy **dist** folder using FTP.

`npm run clean` --- clean **dist** directory.
