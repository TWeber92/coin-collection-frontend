export class CoinDTO {
  static #json = {};
  #template;
  #coin;
  #year;
  #clone;
  constructor(data) {
    data = { ...CoinDTO.#json, ...data };
    this.#template = `
          <div id="${data.stateName}" class="coin-container">
            <img class="coin-heads coin-front" src="${data.obvThumb}" alt="${data.stateName} front" />
            <img class="coin-tails coin-back" src="${data.revThumb}" alt="${data.stateName} back" />
          </div>`;
    this.#year = data.mintYear;
    this.#coin = data.coin;
    this.#clone = data.clone;
    CoinDTO.#json = this.#toJSON();
  }

  #toJSON() {
    return {
      template: this.#template,
      year: this.#year,
      coin: this.#coin,
      clone: this.#clone,
    };
  }

  static fromDTO(dto) {
    return new CoinDTO(dto).#toJSON();
  }
  static fromEntity(entity) {
    return new CoinDTO(entity).#toJSON();
  }
}
