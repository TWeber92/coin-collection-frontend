export class CarouselEntity {
  #active;
  #next;
  #prev;
  #nodes;
  #navPaths;
  constructor(dto) {
    this.#nodes = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.childNodes;
    this.#navPaths = dto.navPaths;
  }
  get slides() {
    return {
      prev: this.#prev,
      active: this.#active,
      next: this.#next,
    };
  }

  set slides({ active, next, prev }) {
    this.#active = new CarouselEntity({ template: active });
    this.#next = new CarouselEntity({ template: next });
    this.#prev = new CarouselEntity({ template: prev });
  }

  static #fromDTO(dto) {
    return new CarouselEntity(dto);
  }
}
