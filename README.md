# glob-module-loader for node.js

A node.js library to find and load files as modules based on glob file syntax (i.e. 'plugins/**/*.js').


## Quick Example

```js
var loader = require('glob-module-loader');

loader.load('plugins/**/*.js', function(err, modules) {
  console.log('Loaded %s' modules.length);
});

loader.loadAsync(
  ['plugins/**/*.js', 'vendor/**/*.js'],
  function(module) { console.log('Loaded a module'); },
  function(err, modules) { console.log('Loading complete'); }
);
```


## Installation

`glob-module-loader` can be easily installed using [npm](http://npmjs.org).

    npm install glob-module-loader

Then simply require glob-module-loader in your application

    require('glob-module-loader');


## Usage

glob-module-loader is intended to find all files matching a glob syntax (i.e. "plugins/**/*.js") and load each file as an individual module.  It can load all modules synchronously and hand back an array, or it can load them asynchronously calling a callback method for each module loaded.

```js
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

## Dependencies

glob-module-loader depends on the following packages:

* [async](https://npmjs.org/package/async)
* [glob](https://npmjs.org/package/glob)


## Documentation

* [load](#load)
* [loadAsync](#loadAsync)

---------------------------------------

<a name="load" />
### load(patterns, callback)

Searches the file system for modules to load based on the glob patterns provided.  Once all modules have been loaded the callback function is called passing the loaded modules as an array.

__Arguments__

* patterns - A string or array of strings containing glob patterns to search.
* callback(err, modules) - A callback which is called after all modules have been
  loaded, or until an error is encountered.  If an error is encountered the callback
  will be called immediately and no modules will be returned.

__Example__

```js
loader.load(['*.js', 'dir/*.js'], function(err, modules){
    // all modules loaded are now in the modules array
});
```

---------------------------------------

<a name="loadAsync" />
### loadAsync(patterns, module_callback, callback)

Searches the file system for modules to load based on the glob patterns provided.  As each module is loaded, the module_callback function will be called passing the loaded module.  Once all modules have been loaded the callback function is called passing the loaded modules as an array.

__Arguments__

* patterns - A string or array of strings containing glob patterns to search.
* module_callback(module) - A function which is called for each module immediately
  after it is loaded.
* callback(err, modules) - A callback which is called after all modules have been
  loaded, or until an error is encountered.  If an error is encountered the callback
  will be called immediately and no modules will be returned.

__Example__

```js
loader.loadAsync(
  ['*.js', 'dir/*.js'],
  function(module) {
    // called for each module
  },
  function(err, modules){
    // all modules loaded are now in the modules array
});
```
