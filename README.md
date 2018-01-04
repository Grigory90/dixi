<h1 align="center">
    <img width="120" height="120" src="https://cdn.rawgit.com/grig0ry/dixi/75285ac9/media/dixi.svg">
</h1>

[![Build Status](https://img.shields.io/travis/grig0ry/dixi/master.svg?style=flat-square)](https://travis-ci.org/grig0ry/dixi)
[![Dependency Status](https://img.shields.io/david/grig0ry/dixi.svg?style=flat-square)](https://david-dm.org/grig0ry/dixi)

> It is a tool for assembling prototypes and simple web pages, based on Gulp 4 and Webpack 3.

## Getting Started

### Installation

```
$ npm i -g dixi
```

### Usage

Run `init` command in the project root directory:

``` bash
$ dixi init
```

Set the base options in [`dixi.config.js`](https://github.com/grig0ry/dixi/blob/master/data/dixi.config.js) file. (See [options](#options))

Start server and watchers:

```
$ dixi run
```

## Documentation

### Project structure

``` bash
.
├─ app                   
│   ├─ src
│   │   ├─ twig
│   │   ├─ icons
│   │   ├─ js
│   │   ├─ scss
│   │   ├─ static
│   │   └─ data.json
│   ├─ dev          
│   └─ build
├─ dixi.config.js
└─ package.json
```

### Commands

``` bash
$ dixi # Reference

$ dixi init  # Initialize project

$ dixi run  # Start server and watchers

$ dixi build # Build project
```

### Options

#### enableRevision

- value <[boolean]>
- default `false`

Static asset revisioning by appending content hash to filenames.

#### createArchive

- value <[boolean]>
- default `false`

Creates zip archive with production files.

#### includeSources

- value <[boolean]>
- default `false`

Copies the source files to the assembly folder.

#### browsersList

- value <[Array]>
- default `['last 2 versions', '> 2%', 'ie >= 11']`

Browsers list for [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) and [autoprefixer](https://github.com/postcss/autoprefixer). See [browserslist](https://github.com/ai/browserslist) for more info.

[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
