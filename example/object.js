'use strict';

var _ = require('lodash');

module.exports = {
  'reference': {
    setup: function(count) {
      this.omitted = _.omit(_.mapValues(_.times(count)), '0');
      this.deleted = _.mapValues(_.times(count));
      delete this.deleted[0];
    },
    funcs: {
      'delete': function() {
        var object = this.deleted;
        var sum = 0;
        for (var key in object) {
          sum += object[key];
        }
      },
      'omit': function() {
        var object = this.omitted;
        var sum = 0;
        for (var key in object) {
          sum += object[key];
        }
      },
      'delete:for': function() {
        var object = this.deleted;
        var keys = Object.keys(object);
        var sum = 0;
        for (var i = 0; i < keys.length; i++) {
          sum += object[keys[i]];
        }
      },
      'omit:for': function() {
        var object = this.omitted;
        var keys = Object.keys(object);
        var sum = 0;
        for (var i = 0; i < keys.length; i++) {
          sum += object[keys[i]];
        }
      }
    }
  },
  'hashProp': {
    setup: function(count) {
      this.object = _.mapValues(_.times(count));
      this.hashObject = _.mapValues(_.times(count));
      this.object['_'] = true;
      this.hashObject['-'] = true;
    },
    funcs: {
      'normal': function() {
        var object = this.object;
        for (var key in object) {
          object[key];
        }
      },
      'hash': function() {
        var object = this.hashObject;
        for (var key in object) {
          object[key];
        }
      }
    }
  },
  'hasOwnProperty': {
    setup: function(count) {
      this.obj = _.mapValues(_.times(count));
    },
    funcs: {
      'normal': function() {
        return this.obj.hasOwnProperty('hoge');
      },
      'call': function() {
        return Object.hasOwnProperty.call(this.obj, 'hoge');
      },
      'in': function() {
        return 'hoge' in this.obj;
      }
    }
  },
  'copy': {
    setup: function(count) {
      this.obj = _.mapValues(_.times(count));
    },
    funcs: {
      'JSON.parse': function() {
        return JSON.parse(JSON.stringify(this.obj));
      },
      'clone': function() {
        return _.clone(this.obj);
      },
      'while': function() {
        var obj = this.obj;
        var keys = Object.keys(this.obj);
        var key;
        var i = -1;
        var length = keys.length;
        var newObj = {};
        while (++i < length) {
          key = keys[i];
          newObj[key] = obj[key];
        }
        return obj;
      }
    }
  },
  'deepCopy': {
    count: 100,
    setup: function(count) {
      this.obj = _.mapValues(_.times(count), function(num) {
        return _.mapValues(_.times(num), function(num) {
          return _.mapValues(_.times(num));
        });
      });
      var called = 0;
      this.deepCopy = function copy(obj) {
        ++called;
        if (typeof obj !== 'object') {
          return obj;
        }
        var result, l;
        var i = -1;
        if (Array.isArray(obj)) {
          l = obj.length;
          result = Array(l);
          while (++i < l) {
            result[i] = copy(obj[i]);
          }
        } else {
          result = {};
          var keys = Object.keys(obj);
          l = keys.length;
          while (++i < l) {
            var key = keys[i];
            result[key] = copy(obj[key]);
          }
        }
        return result;
      };
    },
    funcs: {
      'JSON.parse': function() {
        return JSON.parse(JSON.stringify(this.obj));
      },
      'cloneDeep': function() {
        return _.cloneDeep(this.obj);
      },
      'deepCopy': function() {
        return this.deepCopy(this.obj);
      }
    }
  }
};
