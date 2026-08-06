import { DocumentStore } from "../DocumentStore.js";
import { APIClient } from "./APIClient.js";
import { DocumentClient } from "./DocumentClient.js";

export class CoinRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");

  static getCoinElement(value) {
    return document.body.appendChild(
      DocumentStore.createDivElement(value).node,
    );
  }
  getCoinByStateName(value) {
    return this.#api.GET(`/api/coin?stateName=${value}`);
  }
  getCoinContainer(value) {
    return super.GET(value, (c) => c.firstElementChild);
  }
  putCoinInEntity(value) {
    super.PUT(value, (c) => this.entity.replaceChildren(c));
  }
}
