'use strict';

module.exports = {
  'min': {
    setup: function() {
      this.a = 1;
      this.b = 2;
      this.expect = 1;
    },
    funcs: {
      'Math#min': function() {
        return Math.min(this.a, this.b);
      },
      '<': function() {
        return this.a < this.b ? this.a : this.b;
      },
      '<=': function() {
        return this.a <= this.b ? this.a : this.b;
      },
      '>': function() {
        return this.a > this.b ? this.b : this.a;
      },
      '>=': function() {
        return this.a >= this.b ? this.b : this.a;
      }
    }
  }
};
