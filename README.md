glob-module-loader for node.js
==============================

A library to load all files as modules based on glob syntax.

Installation
------------

`glob-module-loader` can be easily installed using [npm](http://npmjs.org).

    npm install glob-module-loader

Then simply require glob-module-loader in your application

    require('glob-module-loader');

Usage
-----

glob-module-loader is intended to find all files matching a glob syntax (i.e. "plugins/**/*.js") and load each file as an individual module.  It can load all modules synchronously and hand back an array, or it can load them asynchronously calling a callback method for each module loaded.

```
   var loader = require('glob-module-loader');

   // load synchronously
   loader.load('plugins/**/*.js', function(err, modules) {
      console.log('Loaded %s' modules, modules.length);
   });

   // load asynchronously
   loader.loadAsync('plugins/**/*.js',
      function(module) {
         console.log('Called for each module loaded');
      },
      function(err, modules) {
         console.log('Loaded %s' modules, modules.length);
      });
```

Dependencies
------------
glob-module-loader depends on the following packages:

* [async](https://npmjs.org/package/async)
* [glob](https://npmjs.org/package/glob)

License
-------
GPLv2
