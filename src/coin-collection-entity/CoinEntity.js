export class CoinEntity {
  #coin;
  #node;
  #year;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#coin = dto.coin;
    this.#year = dto.year;
  }

  #toJSON() {
    return {
      coin: this.#coin,
      year: this.#year,
      node: this.#node,
    };
  }

  static fromDTO(dto) {
    return new CoinEntity(dto).#toJSON();
  }
}
