'use strict';

var _ = require('lodash');

var Comparator = require('func-comparator').Comparator;

module.exports = function(defaults) {

  return function comparator(task, name, callback) {
    var count = task.count || defaults.count;
    var times = task.times || defaults.times;
    var data = {};
    var setup = task.setup;
    if (setup) {
      setup.call(data, count);
    }
    var expect = data.expect;
    var result = {};
    var funcs = task.funcs;
    funcs = _.mapValues(funcs, function(func, key) {
      if (_.isObject(expect)) {
        result[key] = [];
        return function() {
          result[key].push(func.call(data));
        };
      }
      if (expect) {
        result[key] = 0;
        return function() {
          if (expect !== func.call(data)) {
            result[key]++;
          }
        };
      }
      return function() {
        func.call(data);
      };
    });
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
      .result(function(err, res) {
        if (err) {
          return callback(err);
        }
        _.chain(res)
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
            var failed;
            if (_.isObject(expect)) {
              failed = _.reduce(result[name], function(count, result) {
                if (!_.isEqual(expect, result)) {
                  return count + 1;
                }
              }, 0);
            } else if (expect) {
              failed = result[name];
            }
            if (failed) {
              console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms', '[Failed] ' + failed);
            } else {
              console.log('[' + (++index) + ']', '"' + name + '"', (mean.toPrecision(2)) + 'ms');
            }
          })
          .value();
        callback();
      });
  };
};
