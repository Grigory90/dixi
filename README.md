<h1 align="center">
    <img width="120" height="120" src="https://cdn.rawgit.com/grig0ry/dixi/88ce9c9c/media/dixi.svg">
</h1>

[![Build Status](https://travis-ci.org/grig0ry/dixi.svg?branch=master)](https://travis-ci.org/grig0ry/dixi)

> Simply project builder based on Gulp 4 and Webpack 3.

## Installation

```
$ npm i -g dixi
```

## Usage in your project

Run init command in the project root directory:

``` bash
$ dixi init -s     # key -s create samples folder, optional
```

Set the base options in **dixi.config.js** file:

``` javascript
{

    revision: false,       // appends content hash to each filename

    deploy: false,         // deploy project using ftp

    archive: false,        // create build zip

    includeSources: false  // include sources in build

}
```

Start server and watchers:

```
$ dixi run
```

## Project structure:

``` bash
.
├─ app                   
│   ├─ src
│   │   ├─ twig
│   │   ├─ icons
│   │   ├─ img
│   │   ├─ js
│   │   ├─ scss
│   │   └─ static
│   ├─ dev          
│   └─ build
├─ dixi.config.js
└─ package.json
```

## Commands:

``` bash
$ dixi                      # reference

$ dixi init [-s, --sample]  # create config file
                            # [-s, --sample] create samples folder

$ dixi run                  # start server and watchers

$ dixi build                # build project
```
