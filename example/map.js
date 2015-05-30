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
  }
};
