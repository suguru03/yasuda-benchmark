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
      'call': function() {
        return this.func.call({});
      },
      'apply': function() {
        return this.func.apply({});
      },
      'bind': function() {
        return this.func.bind({})();
      }
    }
  },
  'args#1': {
    setup: function() {
      this.func = function() {
        return 1;
      };
      this.args = _.times(1, function() {
        return {};
      });
    },
    funcs: {
      'call': function() {
        return this.func.call({}, this.args[0]);
      },
      'apply': function() {
        return this.func.apply({}, this.args);
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
  }
};
