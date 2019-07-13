<h1 align="center">
    <img width="120" height="120" src="https://cdn.rawgit.com/grig0ry/dixi/75285ac9/media/dixi.svg">
</h1>

> It is a tool for assembling prototypes and static web pages, based on Gulp and Webpack.

[![npm](https://img.shields.io/npm/v/@dixi/core.svg?style=flat-square)](https://www.npmjs.com/@dixi/core)
[![Build Status](https://img.shields.io/travis/grig0ry/dixi/master.svg?style=flat-square)](https://travis-ci.com/grig0ry/dixi)
[![Dependency Status](https://img.shields.io/david/grig0ry/dixi.svg?style=flat-square)](https://david-dm.org/grig0ry/dixi)

## Getting Started

### Installation

```
$ npm i @dixi/core -g
```

### Usage

Run `init` command in the project root directory:

``` bash
$ di init
```

Start server and watchers:

```
$ di run
```

Build project:

```
$ di build
```

### Project structure

``` bash
.
├─ app                   
│   ├─ build
│   ├─ dev
│   ├─ src
│   │   ├─ data
│   │   ├─ icons
│   │   ├─ js
│   │   ├─ njk
│   │   ├─ scss
│   │   ├─ static
│   │   └─ data.json      
├─ dixi.config.js
└─ package.json
```

### Commands

``` bash
Usage: di <command> [options]

Options:
  -V, --version    output the version number
  -h, --help       output usage information

Commands:
  init             Create configuration file in working directory.
  run [options]    Run server and watchers.
  build [options]  Build project.

Run `di <command> --help` for reference.
```

### Configuration
https://github.com/grig0ry/dixi/blob/master/lib/dixi.config.js


## License

Licensed under the [MIT License](LICENSE.md)

[Class]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class "Class"
[Function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object  "Object"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array  "Array"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type  "Boolean"
