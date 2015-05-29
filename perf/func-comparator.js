'use strict';

var _ = require('lodash');
var async = require('neo-async');

var Comparator = require('func-comparator').Comparator;

module.exports = function(config, callback) {
  var defaults = config.defaults;
  var tasks = _.omit(config, 'defaults');

  async.eachSeries(tasks, iterator, callback);

  function iterator(task, name, done) {
    var count = task.count || defaults.count;
    var times = task.times || defaults.times;
    var data = {};
    task.setup.call(data, count);
    var expect = data.expect;
    var failed = {};
    var funcs = task.funcs;
    if (expect) {
      funcs = _.mapValues(funcs, function(func, key) {
        failed[key] = 0;
        return function() {
          if (expect !== func.call(data)) {
            ++failed[key];
          }
        };
      });
    }
    new Comparator()
      .set(funcs)
      .times(times)
      .option({
        min: false,
        max: false,
        variance: false,
        standard_deviation: false,
        versus: false
      })
      .start()
      .result(function(err, result) {
        if (err) {
          return done(err);
        }
        console.log('//==== ' + name + ' =========//');
        _.chain(result)
          .map(function(data, name) {
            return {
              name: name,
              mean: data.average
            };
          })
          .sortBy('mean')
          .forEach(function(data, index) {
            var name = data.name;
            var mean = data.mean / 1000;
            if (expect && failed[name]) {
              console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms', '[Failed] ' + failed[name]);
            } else {
              console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms');
            }
          })
          .value();
      });
  }
};
