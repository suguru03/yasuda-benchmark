'use strict';

var _ = require('lodash');

module.exports = {
  defaults: {
    count: 10000,
    times: 1000000 // for func-comparator
  },
  'each:array': {
    setup: function(count) {
      this.array = _.times(count);
      this.sum = function(array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
          sum += array[i];
        }
        return sum;
      };
      // this.expect = _.sum(this.array); // check result
    },
    funcs: {
      'Array#forEach': function() {
        var sum = 0;
        this.array.forEach(function(n) {
          sum += n;
        });
        return sum;
      },
      'for': function() {
        var sum = 0;
        var array = this.array;
        for (var i = 0; i < array.length; i++) {
          sum += array[i];
        }
        return sum;
      },
      'while': function() {
        var sum = 0;
        var index = -1;
        var array = this.array;
        while (++index < array.length) {
          sum += array[index];
        }
        return sum;
      },
      'lodash#forEach': function() {
        var sum = 0;
        _.forEach(this.array, function(n) {
          sum += n;
        });
        return sum;
      },
      'lodash#sum': function() {
        return _.sum(this.array);
      }
    }
  },
  'each:object': {
    setup: function(count) {
      this.object = _.mapValues(_.times(count));
      this.expect = _.sum(this.object); // check result
    },
    funcs: {
      'for-in': function() {
        var sum = 0;
        var object = this.object;
        for (var key in object) {
          sum += object[key];
        }
        return sum;
      },
      'for': function() {
        var sum = 0;
        var object = this.object;
        var keys = Object.keys(object);
        for (var i = 0; i < keys.length; i++) {
          sum += object[keys[i]];
        }
        return sum;
      },
      'while': function() {
        var sum = 0;
        var index = -1;
        var object = this.object;
        var keys = Object.keys(object);
        var length = keys.length;
        while (++index < length) {
          sum += object[keys[index]];
        }
        return sum;
      },
      'lodash#forOwn': function() {
        var sum = 0;
        _.forOwn(this.object, function(n) {
          sum += n;
        });
        return sum;
      },
      'lodash#forEach': function() {
        var sum = 0;
        _.forEach(this.object, function(n) {
          sum += n;
        });
        return sum;
      },
      'lodash#sum': function() {
        return _.sum(this.object);
      }
    }
  }
};
