'use strict';

class Queue1 {

  constructor() {
    this.tail = undefined;
    this.head = undefined;
  }

  push(task) {
    const { tail } = this;
    this.tail = task;
    if (tail) {
      tail.tail = task;
    } else {
      this.head = task;
    }
  }

  shift() {
    const { head } = this;
    this.head = head.tail;
    if (!this.head) {
      this.tail = undefined;
    }
    return head;
  }
}


class Queue2 {

  constructor(len) {
    this.array = Array(len);
    this.length = 0;
  }

  push(task) {
    this.array[this.length++] = task;
  }

  shift() {
    const index = --this.length;
    const task = this.array[index];
    this.array[index] = undefined;
    return task;
  }
}

module.exports = {
  'queue': {
    setup: function(count) {
      this.count = count;
      this.array1 = [];
      this.array2 = Array(count);
      this.queue1 = new Queue1();
      this.queue2 = new Queue2(count);
    },
    funcs: {
      array1: function() {
        const queue = this.array2;
        for (let i = 0; i < this.count; i++) {
          queue.push(i);
        }
        while (queue.length !== 0) {
          const i = queue.shift();
        }
      },
      array2: function() {
        const queue = this.array2;
        let l = this.count;
        for (let i = 0; i < l; i++) {
          queue[i] = i;
        }
        while (l--) {
          const i = queue[l];
          queue[l] = undefined;
        }
      },
      queue1: function() {
        const queue = this.queue1;
        for (let i = 0; i < this.count; i++) {
          queue.push({ i });
        }
        while (queue.head) {
          const { i } = queue.shift();
        }
      },
      queue2: function() {
        const queue = this.queue2;
        for (let i = 0; i < this.count; i++) {
          queue.push(i);
        }
        while (queue.length !== 0) {
          const i = queue.shift();
        }
      }
    }
  }
};
