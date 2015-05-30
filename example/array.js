'use strict';

module.exports = {
  'array:init': {
    count: 100000,
    setup: function(count) {
      this.size = count;
    },
    funcs: {
      'Array()': function() {
        Array(this.size);
      },
      'new Array()': function() {
        new Array(this.size);
      },
      'length': function() {
        var array = [];
        array.length = this.size;
      }
    }
  }
};
