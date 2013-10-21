var path  = require('path');
var glob  = require('glob');
var async = require('async');

var load = module.exports.load = function(patterns, module_callback, callback) {
  // check if the caller wants to be called for every module, or just the end
  if (!callback) {
    callback = module_callback;
    module_callback = null;
  };

  patterns = Array.isArray(patterns) ? patterns : [patterns];

  var modules = [];

  var loadModule = function(file, cb) {
    try {
      var module = require(path.resolve(process.cwd(), file));
      modules.push(module);
      if (module_callback) {
        module_callback(module);
      }
      cb();
    } catch (err) {
      cb(err);
    }
  };

  var loadFiles = function(files, cb) {
    async.each(files, loadModule, cb);
  };

  var loadPattern = function(pattern, cb) {
    glob(pattern, {}, function(err, files) {
      if (err) return cb(err);
      loadFiles(files, cb);
    });
  }

  async.each(patterns, loadPattern, function(err) {
    if (err) return callback(err);
    return callback(null, modules);
  });

};
