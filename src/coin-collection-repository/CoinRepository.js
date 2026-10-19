import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { DocumentClient } from "./DocumentClient.js";

export class CoinRepository extends DocumentClient {
  #cacheId = "coins";
  constructor(view, api, browser) {
    super();
    this.#entity = view.entity;
    this.#api = api;
    this.#browser = browser
  }
  #api
  #entity;
  #browser

  get entity() {
    return this.#entity;
  }
  getCoinByStateName(name) {
    return this.#api.GET(`/api/coin?stateName=${name}`);
  }
  getCoinWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  putSelectedCoinInEntity(coin) {
    return super.GET(coin, (c) => {
      const newId = c.id + "ed";
      const current = this.#entity.selected?.lastChild;
      if (current?.id === newId) current.id = c.id;
      c.id = newId;
      this.#entity.selected = c.parentNode;
      document.body.dataset.overlay = "true";
    });
  }
  getCacheCoinFromSession(name) {
    const session = this.#browser.getSessionStorageByKey(this.#cacheId);
    return session[name];
  }
  putCacheCoinInSession({ k, c }) {
    this.#browser.putNewItemInSessionByKey(this.#cacheId, k, c);
  }
  putCoinInEntity(coin) {
    super.PUT(coin, (c) => this.#entity.coin.replaceChildren(c));
    return this.#entity.coin;
  }
  deletePartOfCoinId(entity) {
    super.PUT(entity.lastChild, (c) => (c.id = c.id.slice(0, -2)));
  }
}
