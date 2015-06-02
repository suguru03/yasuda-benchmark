'use strict';

var _ = require('lodash');

module.exports = {
  'args#0': {
    setup: function() {
      this.func = function() {
        return 1;
      };
    },
    funcs: {
      '()': function() {
        this.func();
      },
      'call': function() {
        this.func.call();
      },
      'apply': function() {
        this.func.apply();
      },
      'bind': function() {
        this.func.bind()();
      }
    }
  },
  'args#1': {
    setup: function() {
      this.object = {};
      this.func = function() {
        return this;
      };
      this.args = _.times(1, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        return this.func.call(this.object, this.args[0]);
      },
      'apply': function() {
        return this.func.apply(this.object, this.args);
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
      this.func = function() {
        return 1;
      };
      this.args = _.times(30, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        var args = this.args;
        return this.func.call({},
          args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9],
          args[10], args[11], args[12], args[13], args[14], args[15], args[16], args[17], args[18], args[19],
          args[20], args[21], args[22], args[23], args[24], args[25], args[26], args[27], args[28], args[29]
        );
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
        return {};
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
