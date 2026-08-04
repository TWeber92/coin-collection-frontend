export class CoinDTO {
  #template;
  #coin;
  #year;
  constructor(data) {
    data = { ...this.#toJSON(), ...data };
    this.#template = `
          <div id="coin" class="coin-container">
            <img class="coin-heads coin-front" src="${data.obvThumb}" alt="${entity.stateName} front" />
            <img class="coin-tails coin-back" src="${data.revThumb}" alt="${entity.stateName} back" />
          </div>`;
    this.#year = data.mintYear;
    this.#coin = data.coin;
  }

  #toJSON() {
    return {
      template: this.#template,
      year: this.#year,
      coin: this.#coin,
    };
  }

  static fromDTO(dto) {
    return new CoinDTO(dto).#toJSON();
  }
  static fromEntity(entity) {
    return new CoinDTO(entity).#toJSON();
  }
}
