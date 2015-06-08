'use strict';

module.exports = {
  'if vs ifelse': {
    funcs: {
      'if': function() {
        var num = 10;
        if (num === 1) {
          return;
        }
        if (num === 2) {
          return;
        }
        if (num === 3) {
          return;
        }
        if (num === 4) {
          return;
        }
        if (num === 5) {
          return;
        }
      },
      'elseif': function() {
        var num = 10;
        if (num === 1) {
          return;
        } else if (num === 2) {
          return;
        } else if (num === 3) {
          return;
        } else if (num === 4) {
          return;
        } else if (num === 5) {
          return;
        }
      },
      'switch': function() {
        var num = 10;
        switch (num) {
          case 1:
            return;
          case 2:
            return;
          case 3:
            return;
          case 4:
            return;
          case 5:
            return;
        }
      }
    }
  }
};
