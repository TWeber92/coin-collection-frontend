export class Coin {
  #coin;
  #name;
  #year;
  constructor(data) {
    this.#coin = data.entity;
    this.#name = data.stateName;
    this.#year = data.mintYear;
  }

  to() {
    return {
      name: this.#name,
      year: this.#year,
      entity: this.#coin,
    };
  }

  static from(data) {
    return new Coin(data);
  }
}
