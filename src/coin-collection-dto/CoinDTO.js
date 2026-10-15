export class CoinDTO {
  #coin;
  #year;
  #name;
  constructor(data){
    this.#coin = data.entity;
    this.#name = data.name;
    this.#year = data.year
  }
  to() {
    return {
      name: this.#name,
      year: this.#year,
      entity: this.#coin,
    }
  }
  static from(data) {
    return new CoinDTO(data)
  }
}
