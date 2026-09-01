export class CollectionEntity {
  #favorites;
  #archive;
  #collection;
  #node;
  #coin;
  #coins;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#coin = dto.coin;
    this.#coins = dto.coins;
    this.#collection = dto.collection;
  }

  #toJSON() {
    return {
      node: this.#node,
      coin: this.#coin,
      coins: this.#coins,
      collection: this.#collection,
    };
  }

  static fromDTO(dto) {
    return new CollectionEntity(dto).#toJSON();
  }
}
