'use strict';

var _ = require('lodash');

module.exports = {
  'func': {
    setup: function() {
      this.obj = {
        _value: true,
        funcA: function() {
          return this._value;
        },
        funcB: function() {
          return this._value;
        },
      }
      this.func = this.obj.funcB;
    },
    funcs: {
      '()': function() {
        return this.obj.funcB();
      },
      'call': function() {
        return this.func.call(this.obj);
      },
    }
  },
  'args#0': {
    setup: function() {
      this.test = true;
      this.func = function() {
        return 1;
      };
    },
    funcs: {
      '()': function() {
        this.func();
      },
      '(1)': function() {
        this.test === true && this.func();
      },
      'call': function() {
        this.func.call(this);
      },
      'apply': function() {
        this.func.apply(this);
      },
      'bind': function() {
        this.func.bind(this)();
      }
    }
  },
  'args#1': {
    setup: function() {
      this.func = function() {
        return this;
      };
      this.args = _.times(1, function() {
        return {};
      });
    },
    funcs: {
      '()': function() {
        return this.func(this.args[0]);
      },
      'call': function() {
        return this.func.call(this, this.args[0]);
      },
      'apply': function() {
        return this.func.apply(this, this.args);
      }
    }
  },
  'args#2': {
    setup: function() {
      this.func = function() {
        return 1;
      };
      this.args = _.times(2, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call({}, args[0], args[1]);
      },
      'apply': function() {
        return this.func.apply({}, this.args);
      }
    }
  },
  'args#3': {
    setup: function() {
      this.func = function() {
        return 1;
      };
      this.args = _.times(3, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call({}, args[0], args[1], args[2]);
      },
      'apply': function() {
        return this.func.apply({}, this.args);
      }
    }
  },
  'args#5': {
    setup: function() {
      this.func = function() {
        return 1;
      };
      this.args = _.times(5, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call({}, args[0], args[1], args[2], args[3], args[4]);
      },
      'apply': function() {
        return this.func.apply({}, this.args);
      }
    }
  },
  'args#10': {
    setup: function() {
      this.func = function() {
        return 1;
      };
      this.args = _.times(10, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call({}, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
      },
      'apply': function() {
        return this.func.apply({}, this.args);
      }
    }
  },
  'args#30': {
    setup: function() {
      this.func = function(
        arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10,
        arg11, arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19, arg20,
        arg21, arg22, arg23, arg24, arg25, arg26, arg27, arg28, arg29, arg30
      ) {
        return arg30;
      };
      this.args = _.times(30, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        switch (args.length) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
          case 8:
            break;
          case 9:
            break;
          case 10:
            break;
          case 11:
            break;
          case 12:
            break;
          case 13:
            break;
          case 14:
            break;
          case 15:
            break;
          case 16:
            break;
          case 17:
            break;
          case 18:
            break;
          case 19:
            break;
          case 20:
            break;
          case 21:
            break;
          case 22:
            break;
          case 23:
            break;
          case 24:
            break;
          case 25:
            break;
          case 26:
            break;
          case 27:
            break;
          case 28:
            break;
          case 29:
            break;
          case 30:
            return this.func.call({},
              args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9],
              args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18], args[19],
              args[20], args[21], args[22], args[23], args[24], args[25], args[26], args[27], args[28], args[29]
            );
          default:
            break;
        }
      },
      'apply': function() {
        return this.func.apply({}, this.args);
      }
    }
  },
  'args#100': {
    setup: function() {
      this.object = {};
      this.func = function() {
        return this;
      };
      this.args = _.times(100, function() {
        return Object.create(_);
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call(this.object,
          args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9],
          args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18], args[19],
          args[20], args[21], args[22], args[23], args[24], args[25], args[26], args[27], args[28], args[29],
          args[30], args[31], args[32], args[33], args[34], args[35], args[36], args[37], args[38], args[39],
          args[40], args[41], args[42], args[43], args[44], args[45], args[46], args[47], args[48], args[49],
          args[50], args[51], args[52], args[53], args[54], args[55], args[56], args[57], args[58], args[59],
          args[60], args[61], args[62], args[63], args[64], args[65], args[66], args[67], args[68], args[69],
          args[70], args[71], args[72], args[73], args[74], args[75], args[76], args[77], args[78], args[79],
          args[80], args[81], args[82], args[83], args[84], args[85], args[86], args[87], args[88], args[89],
          args[90], args[91], args[92], args[93], args[94], args[95], args[96], args[97], args[88], args[99]
        );
      },
      'apply': function() {
        return this.func.apply(this.object, this.args);
      }
    }
  }
};
