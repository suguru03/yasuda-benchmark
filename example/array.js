'use strict';

var _ = require('lodash');
var lo = require('../lodash');

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
  'array:sortBy': {
    setup: function(count) {
      this.array = _.shuffle(_.times(100));
    },
    funcs: {
      'old': function() {
        return _.sortBy(this.array, n => n);
      },
      'new': function() {
        return lo.sortBy(this.array, n => n);
      },
    }
  },
  'array:sort:object': {
    setup: function(count) {
      this.array = _.shuffle(_.times(100));
      this.objectArray = this.array.map((n, i) => ({ i, criteria: n }));
      this.criteria = this.array;
      this.sortByCriteria = sortByCriteria;
      this.clone = function(array) {
        var length = array.length;
        var newArray = Array(length);
        while(length--) {
          newArray[length] = array[length];
        }
        return newArray;
      };
      /**
       * @private
       * @param {Array} array
       * @param {number[]} criteria
       */
      function sortByCriteria(array, criteria) {
        var l = array.length;
        var indices = Array(l);
        for (var i = 0; i < l; i++) {
          indices[i] = i;
        }
        quickSort(criteria, 0, l - 1, indices);
        var result = Array(l);
        for (var n = 0; n < l; n++) {
          var i = indices[n];
          result[n] = i === undefined ? array[n] : array[i];
        }
        return result;
      }

      function partition(array, i, j, x, indices) {
        var l = i;
        var r = j;
        while (l <= r) {
          while (l <= j && array[l] < x) {
            l++;
          }
          while (r >= i && array[r] >= x) {
            r--;
          }
          if (l > r) {
            break;
          }
          swap(array, indices, l++, r--);
        }
        return l;
      }

      function swap(array, indices, l, r) {
        var n = array[l];
        array[l] = array[r];
        array[r] = n;
        var i = indices[l];
        indices[l] = indices[r];
        indices[r] = i;
      }

      function quickSort(array, i, j, indices) {
        if (i === j) {
          return;
        }
        var k = i;
        while (++k <= j && array[i] === array[k]) {
          if (indices[i] > indices[k]) {
            swap(array, indices, i, k);
            return;
          }
        }
        if (k > j) {
          return;
        }
        var p = array[i] > array[k] ? i : k;
        var k = partition(array, i, j, array[p], indices);
        quickSort(array, i, k - 1, indices);
        quickSort(array, k, j, indices);
      }
    },
    funcs: {
      'basic': function() {
        const array = this.clone(this.objectArray);
        array.sort((a, b) => a.criteria - b.criteria);
        let l = array.length;
        while (l--) {
          array[l] = array[l].criteria;
        }
      },
      'new': function() {
        const array = this.array;
        const criteria = this.clone(this.criteria);
        this.sortByCriteria(array, criteria);
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
  },
  'array:immutable:push': {
    setup: function() {
      this._array = _.times(100);
      this._args = _.times(10000);
      this._concat = (array, ...args) => {
        return array.concat(args);
      };
      this._length = (array, ...args) => {
        let l = array.length;
        let l1 = l;
        let l2 = args.length;
        const result = Array(l1 + l2);
        while (l1--) result[l1] = array[l1];
        while (l2--) result[l2 + l] = args[l2];
        return result;
      };
    },
    funcs: {
      'concat': function() {
        return this._concat(this._array, ...this._args);
      },
      'length': function() {
        return this._length(this._array, ...this._args);
      },
    }
  }
};
