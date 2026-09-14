export class CoinEntity {
  #coin;
  #node;
  #year;
  #name;
  #tooltip;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#coin = dto.coin;
    this.#year = dto.year;
    this.#name = dto.name;
    this.#tooltip = dto.tooltip;
  }

  #toJSON() {
    return {
      coin: this.#coin,
      year: this.#year,
      node: this.#node,
      name: this.#name,
    };
  }

  static fromDTO(dto) {
    return new CoinEntity(dto).#toJSON();
  }
}
