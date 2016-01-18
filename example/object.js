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
  }
};
