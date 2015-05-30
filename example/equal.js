'use strict';

module.exports = {
  'true': {
    count: 1000000,
    setup: function() {
      this.a = 1;
      this.b = 1;
    },
    funcs: {
      '==': function() {
        return this.a == this.b;
      },
      '===': function() {
        return this.a === this.b;
      }
    }
  },
  'false': {
    times: 1000000,
    setup: function() {
      this.a = 1;
      this.b = 2;
    },
    funcs: {
      '==': function() {
        return this.a == this.b;
      },
      '===': function() {
        return this.a === this.b;
      }
    }
  }
};
