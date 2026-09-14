export class PageEntity {
  #collection;
  #collections;
  #collectionId;
  #direction;
  #node;
  #coins;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#collection = dto.collection;
    this.#collections = dto.collections;
    this.#collectionId = dto.id;
    this.#direction = dto.direction;
    this.#coins = dto.coins;
  }

  #toJSON() {
    return {
      id: this.#collectionId,
      node: this.#node,
      coins: this.#coins,
      header: new PageEntity({ template: this.#collections.header }).#node,
      body: new PageEntity({ template: this.#collections.body }).#node,
      footer: new PageEntity({ template: this.#collections.footer }).#node,
      direction: this.#direction,
      collection: this.#collection,
    };
  }

  static fromDTO(dto) {
    return new PageEntity(dto).#toJSON();
  }
}
