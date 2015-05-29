'use strict';

var _ = require('lodash');

module.exports = {
  defaults: {
    avaiable: true,
    count: 10000,
    times: 10000 // for func-comparator
  },
  'forEach:array': {
    setup: function(count) {
      this.array = _.times(count);
      this.expect = _.sum(this.array); // check result
    },
    funcs: {
      'Array#each': function() {
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
      }
    }
  }
};
