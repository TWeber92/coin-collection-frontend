export class Carousel {
  #navigation;
  #active;
  #next;
  #prev;

  constructor(data) {
    this.#navigation = data.navigation;
    this.#active = data.active;
    this.#next = data.next;
    this.#prev = data.prev;
  }

  to() {
    return {
      nav: this.#navigation,
      slides: {
        prev: this.#prev,
        active: this.#active,
        next: this.#next,
      },
    };
  }
  static from(data) {
    return new Carousel(data);
  }
}
