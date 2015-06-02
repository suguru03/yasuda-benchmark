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
        var func = this.func;
        for (var i = 0; i < length; i++) {
          func();
        }
      },
      'for:short': function() {
        var length = this.length;
        var func = this.func;
        for (var i = 0; ++i < length;) {
          func();
        }
      },
      'while': function() {
        var i = -1;
        var length = this.length;
        var func = this.func;
        while(++i < length) {
          func();
        }
      },
      'while:--': function() {
        var l = this.length;
        var func = this.func;
        while(l--) {
          func();
        }
      }
    }
  }
};
