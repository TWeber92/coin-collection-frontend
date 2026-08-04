import { DocumentStore } from "../DocumentStore";
import { APIClient } from "./APIClient";
import { DocumentClient } from "./DocumentClient";

export class CoinRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");

  static getCoinElement(value) {
    return DocumentStore.createDivElement(value).appendTo(document.body);
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
