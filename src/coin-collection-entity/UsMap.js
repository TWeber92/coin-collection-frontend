export class UsMap {
  #active;
  #next;
  #prev;

  constructor(data) {
    this.#prev = data.prev;
    this.#active = data.active;
    this.#next = data.next;
  }

  to() {
    return {
      navPaths: {
        prev: this.#prev,
        active: this.#active,
        next: this.#next,
      },
    };
  }

  static from(data) {
    return new UsMap(data);
  }
}
