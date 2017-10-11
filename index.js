'use strict';

var path = require('path');

var _ = require('lodash');
var async = require('neo-async');

var argv = require('minimist')(process.argv.slice(2));
var conf = argv.c || argv.conf; // -c <path>, --conf <path>
var benchmark = argv.b || argv.bench || argv.benchmark; // -b benchmark, --bench func-comparator, --benchmark b
var target = argv.t || argv.target; // -t each:array, --target each

var config = require(path.resolve(process.env.PWD, conf));
var defaults = _.defaults(config.defaults || {}, {
  count: 10000,
  times: 10000 // for func-comparator
});
var benchmarks = [
  'benchmark.js',
  'func-comparator'
];
var regExp = new RegExp('^' + benchmark);
benchmarks = _.chain(benchmarks)
  .filter(function(name) {
    return !benchmark || regExp.test(name);
  })
  .map(function(name) {
    var requirePath = path.resolve('./perf', name);
    return {
      name: name,
      func: require(requirePath)(defaults)
    };
  })
  .value();

regExp = new RegExp('^' + target);
config = _.chain(config)
  .omit('defaults')
  .pickBy(function(conf, key) {
    return !target || regExp.test(key);
  })
  .value();

async.eachSeries(config, function(task, taskName, done) {
  console.log('//==== ' + taskName + ' =========//');
  async.eachSeries(benchmarks, function(benchmark, next) {
    console.log('**** ' + benchmark.name + ' ****');
    benchmark.func(task, taskName, next);
  }, done);
}, function(err) {
  process.exit(!!err);
});
