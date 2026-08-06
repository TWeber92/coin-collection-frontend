export class CoinDTO {
  #template;
  #coin;
  #year;
  #action;
  constructor(data) {
    data = { ...this.#toJSON(), ...data };
    this.#template = `
          <div id="${data.stateName}" class="coin-container">
            <img class="coin-heads coin-front" src="${data.obvThumb}" alt="${data.stateName} front" />
            <img class="coin-tails coin-back" src="${data.revThumb}" alt="${data.stateName} back" />
          </div>`;
    this.#year = data.mintYear;
    this.#coin = data.coin;
    this.#action = data.action;
  }

  #toJSON() {
    return {
      template: this.#template,
      year: this.#year,
      coin: this.#coin,
      action: this.#action,
    };
  }

  static fromDTO(dto) {
    return new CoinDTO(dto).#toJSON();
  }
  static fromEntity(entity) {
    return new CoinDTO(entity).#toJSON();
  }
}
