export class PageEntity {
  static #collections;
  #collection;
  #node;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#collection = dto.collection;
  }

  static get collections() {
    return this.#collections;
  }
  static set collections(node) {
    this.#collections = node;
  }

  #toJSON() {
    return {
      node: this.#node,
      collection: this.#collection,
      collections: PageEntity.#collections,
    };
  }

  static fromDTO(dto) {
    return new PageEntity(dto).#toJSON();
  }
}
