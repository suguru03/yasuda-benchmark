'use strict';

module.exports = {
  'loop': {
    count: 100000,
    times: 1000000,
    setup: function(count) {
      this.length = count;
      this.i = 0;
      this.func = function() {
        return this;
      };
      // this.expect = length;
    },
    funcs: {
      'for': function() {
        var length = this.length;
        var sum = 0;
        for (var i = 0; i < length; i++) {
          sum += i;
        }
      },
      'for:short': function() {
        var length = this.length;
        var sum = 0;
        for (var i = 0; ++i < length;) {
          sum += i;
        }
      },
      'while': function() {
        var i = -1;
        var length = this.length;
        var sum = 0;
        while(++i < length) {
          sum += i;
        }
      },
      'while:--': function() {
        var l = this.length;
        var sum = 0;
        while(l--) {
          sum += l;
        }
      }
    }
  }
};
