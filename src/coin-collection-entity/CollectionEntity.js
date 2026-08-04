export class CollectionEntity {
  static #favorites;
  static #archive;
  #nodes;
  #coin;
  constructor(dto) {
    this.#nodes = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.childNodes;
    this.#coin = dto.coin;
  }

  static get collection() {
    return {
      favorites: this.#favorites,
      archive: this.#archive,
    };
  }
  static set favorites(node) {
    this.#favorites = node;
  }
  static set archive(node) {
    this.#archive = node;
  }

  static #fromDTO(dto) {
    return new CollectionEntity(dto);
  }
}
