var glob  = require('glob');
var async = require('async');

var load = module.exports.load = function(patterns, callback) {
  loadAsync(patterns, null, callback);
};

var loadAsync = module.exports.loadAsync = function(patterns, module_callback, callback) {
  patterns = Array.isArray(patterns) ? patterns : [patterns];

  var modules = [];

  var loadModule = function(file, cb) {
    try {
      var module = require('./' + file);
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
