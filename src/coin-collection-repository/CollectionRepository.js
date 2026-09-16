import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { DocumentClient } from "./DocumentClient.js";

export class CollectionRepository extends DocumentClient {
  constructor({ collection }) {
    super();
    this.#entity = { favorites: collection.favorites };
  }

  #entity;
  #mq = window.matchMedia("(max-width: 768px)").matches;
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #browser = new BrowserRepository();

  getCollectionById(value) {
    return super.GET(value.id, (id) => this.#entity[id]);
  }
  getStateNameFromCoin(value) {
    return super.GET(value, (v) => v.c.lastChild.id);
  }
  getCoinFromArchiveCollection(value) {
    return super.GET(value, (n) =>
      this.#entity.archive?.lastChild.querySelector(`#${n}`),
    );
  }
  getLocalStorageByKey(value) {
    return this.#browser.getLocalStorageByKey(value);
  }
  async postToFavoritesCollection(value) {
    if (value.user?.authenticated) await this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey(value.id.fid, value.name);
    if (this.#mq)
      super.POST(value.coin, (c) => this.#entity.favorites.lastChild.append(c));
    this.#deleteArchivedCoin(value);
  }
  async postToArchiveCollection(value) {
    if (value.user.authenticated) await this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey(value.id.aid, value.name);
    super.POST(value.coin, (c) => this.#entity.archive.lastChild.append(c));
    this.#browser.deleteItemInLocalByKey(value.id.fid, value.name);
  }
  putFavoriteBackInContainer(value) {
    super.PUT(value, (c) => this.#entity.favorites.lastChild.append(c));
  }
  putCollectionOnOrOffDisplay(value) {
    super.PUT(value, (c) => {
      c.hidden = !c.hidden;
      c.previousSibling.children[c.parentNode.id].textContent = c.hidden
        ? "︿"
        : "﹀";
    });
  }
  putArchiveCollectionInEntity(value) {
    this.#entity.archive = value;
  }
  async deleteFromArchiveCollection(value) {
    if (value.user.authenticated) await this.#api.DELETE("", value.user);
    this.#deleteArchivedCoin(value);
    super.DELETE(value.coin, (c) => c.remove());
  }
  #deleteArchivedCoin(value) {
    this.#browser.deleteItemInLocalByKey(value.id.aid, value.name);
  }
}
