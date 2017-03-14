# Dixi

> Simply project builder based on Gulp 4 and Webpack 2.

## Usage

### Installation

```
$ npm i -g dixi
```

### Use in your project

Run init command in the project root directory:

``` bash
$ dixi init -s     # key -s create samples folder, optional
```

Set the base options in **builder.config.js** file:

``` javascript
{
    preproc: 'scss',         // css preprocessor, sass or less
    
    revision: false,         // appends content hash to each filename

    deploy: false,           // deploy project using ftp

    archive: false,          // create build zip

    defaultName: 'project'   // the default project name, if there is no package file
                             // (used in archive filename and remote folder name)
}
```

Start server and watchers:

```
$ dixi run
```

##### Project structure

``` bash
.
├─ app                   
│   ├─ src
│   │   ├─ twig
│   │   ├─ icons
│   │   ├─ img
│   │   ├─ js
│   │   ├─ sass/less
│   │   └─ static
│   ├─ dev          
│   └─ build
├─ dixi.config.js
└─ package.json
```

##### Commands

``` bash
$ dixi                      # reference

$ dixi init [-s, --sample]  # create config file
                            # [-s, --sample] create samples folder

$ dixi run                  # start server and watchers

$ dixi build                # build project
```
