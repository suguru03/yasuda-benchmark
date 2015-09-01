'use strict';

var _ = require('lodash');

module.exports = {
  'map:array': {
    setup: function(count) {
      this.array = _.times(count);
    },
    funcs: {
      'Array#map': function() {
        return this.array.map(function(n) {
          return n * 2;
        });
      },
      'for:push': function() {
        var array = this.array;
        var length = array.length;
        var result = [];
        for (var i = 0; i <length; i++) {
          result.push(array[i] * 2);
        }
        return result;
      },
      'for:index': function() {
        var array = this.array;
        var length = array.length;
        var result = [];
        for (var i = 0; i <length; i++) {
          result[i] = array[i] * 2;
        }
        return result;
      },
      'for:index:init': function() {
        var array = this.array;
        var length = array.length;
        var result = Array(length);
        for (var i = 0; i <length; i++) {
          result[i] = array[i] * 2;
        }
        return result;
      },
      'while:push': function() {
        var array = this.array;
        var length = array.length;
        var index = -1;
        var result = [];
        while(++index < length) {
          result.push(array[index] * 2);
        }
        return result;
      },
      'while:index': function() {
        var array = this.array;
        var length = array.length;
        var index = -1;
        var result = [];
        while(++index < length) {
          result[index] = array[index] * 2;
        }
        return result;
      },
      'while:index:init': function() {
        var array = this.array;
        var length = array.length;
        var index = -1;
        var result = Array(length);
        while(++index < length) {
          result[index] = array[index] * 2;
        }
        return result;
      },
      'lodash#map': function() {
        return _.map(this.array, function(n) {
          return n * 2;
        });
      }
    }
  },
  'Map': {
    setup: function(count) {
      var map = new Map();
      _.times(count, function(n) {
        map.set(n, n);
      });
      this.map = map;
    },
    funcs: {
      'symbolIter': function() {
        var iter = this.map[Symbol.iterator]();
        var item;
        var key, value;
        while((item = iter.next()).done === false) {
          key = item.value[0];
          value = item.value[1];
        }
      },
      'keyIter': function() {
        var map = this.map;
        var keyIter = map.keys();
        var item;
        var key, value;
        while((item = keyIter.next().done === false)) {
          key = item.value;
          value = map.get(key);
        }
      },
      'forEach': function() {
        var key, value;
        this.map.forEach(function(v, k) {
          key = k;
          value = v;
        });
      }
    }
  }
};
