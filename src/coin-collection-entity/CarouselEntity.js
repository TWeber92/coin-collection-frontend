export class CarouselEntity {
  #nodes;
  #active;
  #next;
  #prev;
  #navPaths;
  constructor(dto) {
    [
      ...(this.#nodes = new DOMParser().parseFromString(
        dto.template,
        "text/html",
      ).body.children),
    ];
    this.#active = dto.active;
    this.#next = dto.next;
    this.#prev = dto.next;
    this.#navPaths = dto.navPaths;
  }
  get nodes() {
    return this.#nodes;
  }

  #toJSON() {
    return {
      nodes: this.#nodes,
      active: new CarouselEntity({ template: this.#active }).#nodes,
      next: new CarouselEntity({ template: this.#next }).#nodes,
      prev: new CarouselEntity({ template: this.#prev }).#nodes,
      navPaths: this.#navPaths,
    };
  }

  static fromDTO(dto) {
    return new CarouselEntity(dto).#toJSON();
  }
}
