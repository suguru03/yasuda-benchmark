'use strict';

var _ = require('lodash');

module.exports = {
  'array:init:simple': {
    count: 100000,
    funcs: {
      '[]': function() {
        return [];
      },
      'new Array': function() {
        return new Array;
      },
      'new Array()': function() {
        return new Array();
      }
    }
  },
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
      this.array = _.shuffle(_.times(count));
      this.index = this.array[count - 1];
      // this.expect = count - 1;
      this.indexOf = function(array, index) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
          if (array[i] === index) {
            return i;
          }
        }
        return -1;
      };
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
      'this#indexOf': function() {
        return this.indexOf(this.array, this.index);
      },
      'lodash#indexOf': function() {
        return _.indexOf(this.array, this.index);
      }
    }
  },
  'array:sortedIndex': {
    setup: function(count) {
      this.array = _.times(count, function(n) {
        return Math.floor(n / 2);
      });
      this.index = count/2 - 1;
      // this.expect = count - 2;
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
      'lodash:indexOf': function() {
        return _.indexOf(this.array, this.index);
      },
      'lodash#sortedIndex': function() {
        return _.sortedIndex(this.array, this.index);
      },
      'binaryIndex': function() {
        var array = this.array;
        var index = this.index;
        var low = 0;
        var high = array.length;

        while (low < high) {
          var mid = (low + high) >>> 1;
          var computed = array[mid];

          if (computed < index) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
    }
  },
  'array:isArray': {
    setup: function(count) {
      this.array = _.times(count);
      this.isArray = function(array) {
        return Array.isArray(array);
      };
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
      },
      'this#isArray': function() {
        return this.isArray(this.array);
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
  },
  'array:sort': {
    setup: function(count) {
      this.array = _.shuffle(_.times(count));
      this.clone = function(array) {
        var length = array.length;
        var newArray = Array(length);
        while(length--) {
          newArray[length] = array[length];
        }
        return newArray;
      };
    },
    funcs: {
      'a-b': function() {
        var array = this.clone(this.array);
        array.sort(function(a, b) {
          return a - b;
        });
      },
      'a>b': function() {
        var array = this.clone(this.array);
        array.sort(function(a, b) {
          return a > b ? 1 : -1;
        });
      },
      'sortBy': function() {
        var array = this.clone(this.array);
        _.sortBy(array, function(n) {
          return n;
        });
      }
    }
  },
  'array:slice': {
    setup: function() {
      var _slice = Array.prototype.slice;
      this.callSlice = function() {
        return _slice.call(arguments, 1);
      };
      this.inlineSlice = function() {
        var l = arguments.length - 1;
        var result = Array(l);
        while (l--) {
          result[l] = arguments[l + 1];
        }
        return result;
      };
      function slice(arrayLike, start) {
          start = start|0;
          var newLen = Math.max(arrayLike.length - start, 0);
          var newArr = Array(newLen);
          for(var idx = 0; idx < newLen; idx++)  {
              newArr[idx] = arrayLike[start + idx];
          }
          return newArr;
      }
      this.funcSlice = function() {
        slice(arguments, 1);
      }
    },
    funcs: {
      'callSlice': function() {
        return this.callSlice(1, 2, 3, 4);
      },
      'inlineSlice': function() {
        return this.inlineSlice(1, 2, 3, 4);
      },
      'funcSlice': function() {
        return this.funcSlice(1, 2, 3, 4);
      },
    }
  }
};
