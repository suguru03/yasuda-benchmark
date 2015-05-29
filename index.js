'use strict';

var path = require('path');

var _ = require('lodash');
var async = require('neo-async');

var argv = require('minimist')(process.argv.slice(2));
var conf = argv.c || argv.conf; // -c <path>, --conf <path>
var benchmark = argv.b || argv.bench || argv.benchmark; // -b benchmark, --bench func-comparator, --benchmark b
var benchmarks = [
  'benchmark.js',
  'func-comparator'
];
if (benchmark) {
  var regExp = new RegExp('^' + benchmark);
  benchmarks = _.filter(benchmarks, function(benchmark) {
    return regExp.test(benchmark);
  });
}

var config = require(path.resolve(process.env.PWD, conf));

async.eachSeries(benchmarks, function(name, next) {
  console.log('**** ' + name + ' ****');
  var requirePath = path.resolve('./perf', name);
  require(requirePath)(config, next);
});
