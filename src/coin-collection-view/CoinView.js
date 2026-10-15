import { DocumentStore } from "../DocumentStore.js";

export class CoinView {
  #coin;
  constructor(data) {
    this.#html = data;
  }

  // #entity = { coin: this.#getCoinElement() };

  get entity() {
    return { coin: this.#getCoinElement() };
  }

  #getCoinElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        className: "coin-entity",
        hidden: true,
        data: { location: "modal" },
      }).node,
    );
  }

  set #html(data) {
    this.#coin = `
          <div id="coin" class="coin-container">
            <img class="coin-heads coin-front" src="${data.obvThumb}" alt="${data.stateName} front" />
            <img class="coin-tails coin-back" src="${data.revThumb}" alt="${data.stateName} back" />
          </div>`;
  }

  #to() {
    return {
      coin: this.#coin,
    };
  }
  static from(data) {
    return new CoinView(data).#to();
  }
}
