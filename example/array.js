'use strict';

var _ = require('lodash');

module.exports = {
  'array:init': {
    count: 100000,
    setup: function(count) {
      this.size = count;
    },
    funcs: {
      'Array()': function() {
        return Array(this.size);
      },
      'new Array()': function() {
        return new Array(this.size);
      },
      'length': function() {
        var array = [];
        array.length = this.size;
        return array;
      }
    }
  },
  'array:indexOf': {
    setup: function(count) {
      this.array = _.times(count);
      this.index = count;
      // this.expect = -1;
    },
    funcs: {
      'Array#indexOf': function() {
        return this.array.indexOf(this.index);
      },
      'for': function() {
        var array = this.array;
        var index = this.index;
        var length = array.length;
        for (var i = 0; i < length; i++) {
          if (array[i] === index) {
            return i;
          }
        }
        return -1;
      },
      'while': function() {
        var array = this.array;
        var index = this.index;
        var i = -1;
        var length = array.length;
        while(++i < length) {
          if (array[i] === index) {
            return i;
          }
        }
        return -1;
      },
      'lodash#indexOf': function() {
        return _.indexOf(this.array, this.index);
      }
    }
  },
  'array:isArray': {
    setup: function(count) {
      this.array = _.times(count);
      // this.expect = true;
    },
    funcs: {
      'Array#isArray': function() {
        return Array.isArray(this.array);
      },
      'lodash#isArray': function() {
        return _.isArray(this.array);
      },
      'toString': function() {
        return Object.prototype.toString.call(this.array) === '[object Array]';
      }
    }
  },
  'array:push': {
    setup: function(count) {
      this.array1 = _.times(count);
      this.array2 = _.times(count);
      // this.expect = this.array1.concat(this.array2);
    },
    funcs: {
      'Array#concat': function() {
        var array1 = _.times(this.array1.length);
        array1 = array1.concat(this.array2);
      },
      'Array#push': function() {
        var array1 = _.times(this.array1.length);
        Array.prototype.push.apply(array1, this.array2);
      }
    }
  },
  'array:push:extra': {
    count: 100,
    setup: function(count) {
      this.arrays = _.times(100, function() {
        return _.times(count);
      });
    },
    funcs: {
      'Array#concat': function() {
        var result = [];
        var arrays = this.arrays;
        var length = arrays.length;
        for (var i = 0; i < length; i++) {
          result = result.concat(arrays[i]);
        }
      },
      'Array#push': function() {
        var result = [];
        var arrays = this.arrays;
        var length = arrays.length;
        for (var i = 0; i < length; i++) {
          Array.prototype.push.apply(result, arrays[i]);
        }
        return result;
      }
    }
  }
};
