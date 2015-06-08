'use strict';

module.exports = {
  'event': {
    setup: function() {
      this.func = function() {
        return this;
      };
    },
    funcs: {
      'setImmediate': function() {
        var func = this.func;
        setImmediate(func);
      },
      'nextTick': function() {
        var func = this.func;
        process.nextTick(func);
      },
      'setTimeout': function() {
        var func = this.func;
        setTimeout(func, 0);
      }
    }
  }
};
