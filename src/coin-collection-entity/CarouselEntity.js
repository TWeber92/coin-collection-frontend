export class CarouselEntity {
  #nodes;
  #active;
  #next;
  #prev;
  #navPaths;
  #svgId;
  constructor(dto) {
    this.#nodes = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#active = dto.active;
    this.#next = dto.next;
    this.#prev = dto.prev;
    this.#navPaths = dto.navPaths;
    this.#svgId = dto.svgId;
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
      svgId: this.#svgId,
    };
  }

  static fromDTO(dto) {
    return new CarouselEntity(dto).#toJSON();
  }
}
