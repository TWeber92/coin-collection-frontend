import { DocumentStore } from "../DocumentStore.js";
import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { DocumentClient } from "./DocumentClient.js";

export class CoinRepository extends DocumentClient {
  #cacheId = "coins";
  constructor() {
    super();
  }
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #entity = this.#getCoinElement();
  #browser = new BrowserRepository();

  #getCoinElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        className: "coin-entity",
        hidden: true,
        data: { location: "modal" },
      }).node,
    );
  }
  getCurrentEntityParent(value) {
    return super.GET(value, (c) => c.parentNode);
  }
  getCloneCoinEntityRemoveTooltip(value) {
    this.#entity.removeChild(value.parentElement);
    return super.GET(this.#entity, (c) => c.cloneNode(true));
  }
  getCoinByStateName(value) {
    return this.#api.GET(`/api/coin?stateName=${value}`);
  }
  getCoinContainer(value) {
    return super.GET(value, (c) => c.firstElementChild);
  }
  getCacheCoinFromSession(value) {
    const session = this.#browser.getSessionStorageByKey(this.#cacheId);
    return session[value];
  }
  putCoinInEntity(value) {
    this.#entity.id = value.n;
    super.PUT(value, (v) => this.#entity.replaceChildren(v.c));
    return this.#entity;
  }
  putCacheCoinInSession(value) {
    this.#browser.putNewItemInSessionByKey(this.#cacheId, value.k, value.c);
  }
}
