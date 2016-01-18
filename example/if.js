'use strict';
var bool1 = 'hoge';
var bool2 = true;
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
  },
  'true vs 1': {
    funcs: {
      'true': function() {
        if (true) return;
      },
      'true ? 1 : 0': function() {
        if (true ? 1 : 0) return;
      },
      '1': function() {
        if (1) return;
      }
    }
  },
  'boolean': {
    funcs: {
      'bool1': function() {
        if (bool1) return;
      },
      '!!bool1': function() {
        if (!!bool1) return;
      },
      '!!bool1 === bool2': function() {
        if (!!bool1 === bool2) return;
      },
      'bool1 == bool2': function() {
        if (bool1 == bool2) return;
      }
    }
  }

};
