'use strict';

var _ = require('lodash');

module.exports = {
  'variable': {
    funcs: {
      'var': function() {
        var a = 1;
      },
      'let': function() {
        let a = 1;
      },
      'const': function() {
        const a = 1;
      }
    }
  },
  'object:destructuring': {
    setup: function(count) {
      this.obj = _.chain(count)
        .times()
        .transform((result, num) => result[`a${num}`] = num, {})
        .value();
    },
    funcs: {
      'assign': function() {
        const a5000 = this.obj.a5000;
        return a5000;
      },
      'destructuring': function() {
        const { a5000 } = this.obj;
        return a5000;
      },
      'destructuring:rename': function() {
        const { a5000: a } = this.obj;
        return a;
      }
    }
  }
};
