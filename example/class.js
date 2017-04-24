'use strict';

const util = require('util');

module.exports = {
  'class': {
    setup: function() {
      this.ES5 = function(value) {
        this._value = value;
      };
      this.ES6 = class Test {
        constructor(value) {
          this._value = value;
        }
      };
    },
    funcs: {
      'es5': function() {
        return new this.ES5(1);
      },
      'es6': function() {
        return new this.ES6(1);
      }
    }
  },
  'child': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
      }
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
      }
      this.ES5 = ES5;
      this.ES6 = ES6;
    },
    funcs: {
      'es5': function() {
        return new this.ES5(1);
      },
      'es6': function() {
        return new this.ES6(1);
      }
    }
  },
  'child:inherits': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
        get() {
          return this._value;
        }
      }
      function ES6(value) {
        this._value = value;
      }
      ES6.prototype = ParentES6.prototype;
      const es6 = new ES6(1);
      console.log(es6.get());
      console.log(es6 instanceof ParentES6);
      this.ES5 = ES5;
      this.ES6 = ES6;
    },
    funcs: {
      'es5': function() {
        return new this.ES5(1);
      },
      'es6': function() {
        return new this.ES6(1);
      }
    }
  },
  'parentFunction': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      ParentES5.prototype.get = function() {
        return this._value;
      };
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
        get() {
          return this._value;
        }
      }
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
      }
      this.es5 = new ES5(1);
      this.es6 = new ES6(1);
    },
    funcs: {
      'es5': function() {
        return this.es5.get();
      },
      'es6': function() {
        return this.es6.get();
      }
    }
  },
  'super': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      ParentES5.prototype.get = function() {
        return this._value;
      };
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      ES5.prototype.get = function() {
        return ParentES5.prototype.get.call(this) * 2;
      };

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
        get() {
          return this._value;
        }
      }
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
        get() {
          return super.get() * 2;
        }
      }
      this.es5 = new ES5(1);
      this.es6 = new ES6(1);
    },
    funcs: {
      'es5': function() {
        return this.es5.get();
      },
      'es6': function() {
        return this.es6.get();
      }
    }
  },
  'super:call1': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      ParentES5.prototype.get = function() {
        return this._value;
      };
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      ES5.prototype.get = function() {
        return ParentES5.prototype.get.call(this) * 2;
      };

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
        get() {
          return this._value;
        }
      }
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
        get() {
          return ParentES6.prototype.get.call(this) * 2;
        }
      }
      this.es5 = new ES5(1);
      this.es6 = new ES6(1);
    },
    funcs: {
      'es5': function() {
        return this.es5.get();
      },
      'es6': function() {
        return this.es6.get();
      }
    }
  },
  'super:call2': {
    setup: function() {
      function ParentES5(value) {
        this._value = value;
      }
      function getES5() {
        return this._value;
      };
      function ES5(value) {
        ParentES5.call(this, value);
      }
      util.inherits(ES5, ParentES5);

      ES5.prototype.get = function() {
        return getES5.call(this) * 2;
      };

      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
      }
      function getES6() {
        return this._value;
      };
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
        get() {
          return getES6.call(this) * 2;
        }
      }
      this.es5 = new ES5(1);
      this.es6 = new ES6(1);
    },
    funcs: {
      'es5': function() {
        return this.es5.get();
      },
      'es6': function() {
        return this.es6.get();
      }
    }
  },
  'instanceof': {
    setup: function() {
      class ParentES6 {
        constructor(value) {
          this._value = value;
        }
      }
      class ES6 extends ParentES6 {
        constructor(value) {
          super(value);
        }
      }
      this.__ES6__ = true;
      class ES6_2 {
        constructor(value) {
          this.__ES6__ = true;
          this._value = value;
        }
      }
      this.ParentES6 = ParentES6;
      this.es6 = new ES6(1);
      this.es6_2 = new ES6_2(1);
    },
    funcs: {
      'es6': function() {
        return this.es6 instanceof this.ParentES6;
      },
      'es6_2': function() {
        return this.es6_2 === this.__ES6__;
      }
    }
  },
}
