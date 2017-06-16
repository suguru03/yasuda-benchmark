'use strict';

var defined;

module.exports = {
  'init': {
    setup: function() {
      defined = function() {
        return true;
      };
      this.expect = true;
    },
    funcs: {
      'inner': function() {
        return func();
        function func() {
          return true;
        }
      },
      'defined': function() {
        return defined();
      },
      'var': function() {
        var func = function() {
          return true;
        };
        return func();
      }
    }
  },
  'pattern1': {
    setup: function() {
      this.expect = 1;
    },
    funcs: {
      'inner': function() {
        return func1();
        function func1() {
          return func2();
        }
        function func2() {
          return func3();
        }
        function func3() {
          return 1;
        }
      },
      'var': function() {
        var func3 = function() {
          return 1;
        };
        var func2 = function() {
          return func3();
        };
        var func1 = function() {
          return func2();
        };
        return func1();
      },
      'inner:prototype': function() {
        function Func() {}
        Func.prototype.func1 = function() {
          return this.func2();
        };
        Func.prototype.func2 = function() {
          return this.func3();
        };
        Func.prototype.func3 = function() {
          return 1;
        };
        return new Func().func1();
      },
      'ver:prototype': function() {
        var Func = function() {};
        Func.prototype.func1 = function() {
          return this.func2();
        };
        Func.prototype.func2 = function() {
          return this.func3();
        };
        Func.prototype.func3 = function() {
          return 1;
        };

        return new Func().func1();
      }
    }
  },
  'pattern2': {
    setup: function() {
      // this.expect = 1;
    },
    funcs: {
      'inner': function() {
        return func1();
        function func1() {
          return func2();
          function func2() {
            return func3();
            function func3() {
              return 1;
            }
          }
        }
      },
      'var': function() {
        var func1 = function() {
          var func2 = function() {
            var func3 = function() {
              return 1;
            };
            return func3();
          };
          return func2();
        };
        return func1();
      }
    }
  },
  'call:arg3': {
    setup: function() {
      this.func0 = function() {};
      this.func1 = function(arg1, arg2, arg3) {};
    },
    funcs: {
      'arg0:func0': function() {
        return this.func0();
      },
      'arg0': function() {
        return this.func1();
      },
      'arg1': function() {
        return this.func1(1);
      },
      'arg2': function() {
        return this.func1(1, 2);
      },
      'arg3': function() {
        return this.func1(1, 2, 3);
      }
    }
  },
  'arguments': {
    setup: function() {
      this.es5 = function(arg) {
        let l = arguments.length;
        if (l <= 1) {
          return arg;
        }
        const array = Array(l);
        while (l--) {
          array[l] = arguments[l];
        }
        return array;
      };
      this.es6 = function(...args) {
        if (args.length <= 1) {
          return args[0];
        }
        return args;
      };
    },
    funcs: {
      'es5': function() {
        return this.es5(1);
      },
      'es6': function() {
        return this.es6(1);
      },
      'es5wthArgs': function() {
        return this.es5(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
      },
      'es6withArgs': function() {
        return this.es6(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
      },
    }
  }
};
