var expect = require('chai').expect;
var loader = require('../index');

describe('loader', function() {

  describe('with a single pattern', function() {

    describe('load', function() {
      var result = {};
      before(function(done) {
        loader.load('test/samples/**/*.js', function(err, modules) {
          result.err = err;
          result.modules = modules;
          done();
        });
      });

      it('did not report an error', function() {
        expect(result.err).not.to.exist;
      });

      it('returns the loaded modules', function() {
        expect(result.modules).to.exist;
        expect(result.modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.modules.map(function(m) { return m.name; });

        expect(actualNames).to.eql(expectedNames);
      });
    });

    describe('loadAsync', function() {
      var result = {
        cb_modules: []
      };
      before(function(done) {
        var mod_cb = function(module) {
          result.cb_modules.push(module);
        };
        loader.loadAsync('test/samples/**/*.js', mod_cb, function(err, modules) {
          result.err = err;
          result.modules = modules;
          done();
        });
      });

      it('did not report an error', function() {
        expect(result.err).not.to.exist;
      });

      it('returns the loaded modules', function() {
        expect(result.modules).to.exist;
        expect(result.modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.modules.map(function(m) { return m.name; });

        actualNames.forEach(function(n) {
          expect(expectedNames).to.contain(n);
        });
      });

      it('calls the callback for each module', function() {
        expect(result.cb_modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.cb_modules.map(function(m) { return m.name; });

        actualNames.forEach(function(n) {
          expect(expectedNames).to.contain(n);
        });
      })
    });
  });

  describe('with multiple patterns', function() {

    describe('load', function() {
      var result = {};
      before(function(done) {
        loader.load(['test/samples/dir1/*.js', 'test/samples/dir2/*.js'], function(err, modules) {
          result.err = err;
          result.modules = modules;
          done();
        });
      });

      it('did not report an error', function() {
        expect(result.err).not.to.exist;
      });

      it('returns the loaded modules', function() {
        expect(result.modules).to.exist;
        expect(result.modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.modules.map(function(m) { return m.name; });

        actualNames.forEach(function(n) {
          expect(expectedNames).to.contain(n);
        });
      });
    });

    describe('loadAsync', function() {
      var result = {
        cb_modules: []
      };
      before(function(done) {
        var mod_cb = function(module) {
          result.cb_modules.push(module);
        };
        loader.loadAsync(['test/samples/dir1/*.js', 'test/samples/dir2/*.js'], mod_cb, function(err, modules) {
          result.err = err;
          result.modules = modules;
          done();
        });
      });

      it('did not report an error', function() {
        expect(result.err).not.to.exist;
      });

      it('returns the loaded modules', function() {
        expect(result.modules).to.exist;
        expect(result.modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.modules.map(function(m) { return m.name; });

        actualNames.forEach(function(n) {
          expect(expectedNames).to.contain(n);
        });
      });

      it('calls the callback for each module', function() {
        expect(result.cb_modules).to.have.length(4);
        var expectedNames = ['sample 1', 'sample 2', 'sample 3', 'sample 4'];
        var actualNames = result.cb_modules.map(function(m) { return m.name; });

        actualNames.forEach(function(n) {
          expect(expectedNames).to.contain(n);
        });
      })
    });

  });

  describe('with an invlaid module', function() {
    describe('load', function() {
      var result = {};
      before(function(done) {
        loader.load('test/samples/*.txt', function(err, modules) {
          result.err = err;
          result.modules = modules;
          done();
        });
      });

      it('should return an error', function() {
        expect(result.err).to.exist;
      });

      it ('should not return modules', function() {
        expect(result.modules).not.to.exist;
      });
    });

  });
});
