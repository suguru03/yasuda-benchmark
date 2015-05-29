'use strict';

var _ = require('lodash');
var async = require('neo-async');
var Benchmark = require('benchmark');

module.exports = function(config, callback) {
  var defaults = config.defaults;
  var tasks = _.omit(config, 'defaults');

  async.eachSeries(tasks, iterator, callback);

  function iterator(task, name, done) {
    var count = task.count || defaults.count;
    var data = {};
    task.setup.call(data, count);
    var expect = data.expect;
    var failed = {};

    var suite = new Benchmark.Suite();
    _.forEach(task.funcs, function(func, key) {
      if (expect) {
        failed[key] = 0;
        suite.add(key, function() {
          if (expect !== func.call(data)) {
            ++failed[key];
          }
        });
      } else {
        suite.add(key, function() {
          func.call(data);
        });
      }
    });
    suite
    // .on('cycle', function(event) {
    //   var mean = event.target.stats.mean * 1000;
    //   console.log(event.target + ', ' + (+mean.toPrecision(2)) + 'ms per run');
    // })
    .on('complete', function() {
      console.log('//==== ' + name + ' =========//');
      _.chain(this)
        .map(function(data) {
          return {
            name: data.name,
            mean: data.stats.mean
          };
        })
        .sortBy('mean')
        .forEach(function(data, index) {
          var name = data.name;
          var mean = data.mean * 1000;
          if (expect && failed[name]) {
            console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms', '[Failed] ' + failed[name]);
          } else {
            console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms');
          }
        })
        .value();
      done();
    })
    .run();
  }
};
