import { DocumentStore } from "../DocumentStore.js";
import { APIClient } from "./APIClient.js";
import { DocumentClient } from "./DocumentClient.js";

export class CoinRepository extends DocumentClient {
  constructor() {
    super();
  }
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #entity = this.#getCoinElement();

  #getCoinElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "coin",
        className: "coin-entity",
        hidden: true,
        data: { location: "modal" },
      }).node,
    );
  }

  getCloneCoinEntity() {
    return super.GET(this.#entity, (c) => c.cloneNode(true));
  }
  getCoinByStateName(value) {
    return this.#api.GET(`/api/coin?stateName=${value}`);
  }
  getCoinContainer(value) {
    return super.GET(value, (c) => c.firstElementChild);
  }
  putCoinInEntity(value) {
    super.PUT(value, (c) => this.#entity.replaceChildren(c));
    this.#entity.hidden = false;
    return this.#entity;
  }
  // putCoinInEntity(value) {
  //   const coin = this.#entity.lastChild;
  //   super.PUT(value, (c) =>
  //     coin ? this.#entity.replaceChild(c, coin) : this.#entity.append(c),
  //   );
  //   this.#entity.hidden = false;
  // }
}
