import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { DocumentClient } from "./DocumentClient.js";

export class CollectionRepository extends DocumentClient {
  constructor({ collection }) {
    super();
    this.#entity = { favorites: collection.favorites };
    console.log(this.#entity.favorites.lastChild);

    this.#mq = window.matchMedia("(max-width: 768px)").matches;
  }
  #mq;
  #entity;
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #browser = new BrowserRepository();

  getCoinFromArchiveCollection(value) {
    super.GET(value, (n) =>
      this.#entity.archived.lastChild.querySelector(`#${n}`),
    );
  }
  getCollectionById(value) {
    return super.GET(value.id, (id) => this.#entity[id]);
  }
  getStateNameFromCoin(value) {
    return super.GET(value, (v) => v.c.lastChild.id);
  }
  postLocalStorage(value) {
    this.#browser.postLocalStorageByKey(value);
  }
  async postToFavoritesCollection(value) {
    if (value.user?.authenticated) await this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey("favorites", value.name);
    console.log(this.#entity);

    if (this.#mq)
      super.POST(value, (c) => this.#entity.favorites.lastChild.append(c));
    this.deleteArchivedCoin(value.name);
  }
  async postToArchiveCollection(value) {
    if (value.user.authenticated) await this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey("archive", value.name);
    super.POST(value, (c) => this.#entity.archive.lastChild.append(c));
  }
  putFavoriteBackInContainer(value) {
    super.PUT(value, (c) => this.#entity.archive.lastChild.append(c));
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
  deleteFromArchiveCollection(value) {
    if (value.user.authenticated) this.#api.DELETE("", value.user);
    this.deleteArchivedCoin(value.name);
    super.DELETE(value.coin, (c) => c.remove());
  }
  deleteArchivedCoin(value) {
    this.#browser.deleteItemInLocalByKey("archive", value);
  }
}
