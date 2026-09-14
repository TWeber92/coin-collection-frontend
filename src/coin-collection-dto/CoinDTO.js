export class CoinDTO {
  static #json = {};
  #template;
  #coin;
  #year;
  #name;
  #clone;
  #tooltip;
  #cache;
  constructor(data) {
    data = { ...CoinDTO.#json, ...data };
    this.#html = data;
    this.#name = data.stateName;
    this.#year = data.mintYear;
    this.#coin = data.coin;
    this.#clone = data.clone;
    this.#tooltip = data.tooltip;
    this.#cache = {
      stateName: data.stateName,
      obvThumb: data.obvThumb,
      revThumb: data.revThumb,
      year: data.year,
    };
    CoinDTO.#json = this.#toJSON();
  }

  set #html(data) {
    this.#template = `
          <div id="coin" class="coin-container">
            <img class="coin-heads coin-front" src="${data.obvThumb}" alt="${data.stateName} front" />
            <img class="coin-tails coin-back" src="${data.revThumb}" alt="${data.stateName} back" />
          </div>`;
  }

  #toJSON() {
    return {
      template: this.#template,
      year: this.#year,
      coin: this.#coin,
      name: this.#name,
      clone: this.#clone,
      tooltip: this.#tooltip,
      cache: this.#cache,
    };
  }

  static fromAPI(dto) {
    return new CoinDTO(dto).#toJSON();
  }
  static fromEntity(entity) {
    return new CoinDTO(entity).#toJSON();
  }
}
