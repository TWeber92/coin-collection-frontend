import { Coin } from "./Coin.js";

export class Tooltip {
  #svg;
  #button;
  #coin
  constructor(data) {
    this.#svg = data.svg;
    this.#button = data.button;
    this.#coin = Coin.from(data)
  }

  to() {
    return {
      svg: this.#svg,
      button: this.#button,
      coin: this.#coin.to()
    };
  }

  static from(data) {
    return new Tooltip(data);
  }
}
