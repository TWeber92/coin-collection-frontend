export class CollectionEntity {
  #id;
  #archiveId;
  #favoritesId;
  #collection;
  #node;
  #coin;
  #user;
  #name;
  #coins;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#id = dto.id;
    this.#archiveId = dto.archiveId;
    this.#favoritesId = dto.favoritesId;
    this.#coin = dto.coin;
    this.#user = dto.user;
    this.#name = dto.name;
    this.#coins = dto.coins;
    this.#collection = dto.collection;
  }

  #toJSON() {
    return {
      id: this.#id,
      archiveId: this.#archiveId,
      favoritesId: this.#favoritesId,
      node: this.#node,
      coin: this.#coin,
      user: this.#user,
      name: this.#name,
      coins: this.#coins,
      collection: this.#collection,
    };
  }

  static fromDTO(dto) {
    return new CollectionEntity(dto).#toJSON();
  }
}
