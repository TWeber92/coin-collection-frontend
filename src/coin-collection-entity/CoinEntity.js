export class CoinEntity {
  static #coin;
  #node;
  #year;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#year = dto.year;
  }

  static set coin(node) {
    this.#coin = node;
  }

  #toJSON() {
    return {
      coin: CoinEntity.#coin,
      year: this.#year,
      node: this.#node,
    };
  }

  static #fromDTO(dto) {
    return new CoinEntity(dto).#toJSON();
  }
}
