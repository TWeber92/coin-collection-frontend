import { APIClient } from "./APIClient";
import { BrowserRepository } from "./BrowserRepository";
import { DocumentClient } from "./DocumentClient";

export class CollectionRepository extends DocumentClient {
  #mq;
  constructor(entity) {
    super(entity);
    this.#mq = document.dataset.mq;
  }
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #browser = new BrowserRepository();

  getCoinFromArchiveCollection(value) {
    super.GET(value, (n) =>
      this.entity.archived.firstElementChild.querySelector(`[data-name="${n}]`),
    );
  }
  getCollectionById(value) {
    super.GET(value, (v) => v.e.parentNode.querySelector(`${v.id}-collection`));
  }

  postLocalStorage(value) {
    this.#browser.postLocalStorageByKey(value);
  }
  postToFavoritesCollection(value) {
    if (value.user.authenticated) this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey("favorites", value.name);
    if (this.#mq)
      super.POST(value, (c) =>
        this.entity.favorites.firstElementChild.append(c),
      );
    this.#deleteArchivedCoin(value.name);
  }
  postToArchiveCollection(value) {
    if (value.user.authenticated) this.#api.POST("", value.user);
    this.#browser.putNewItemInLocalByKey("archive", value.name);
    super.POST(value, (c) => this.entity.archive.firstElementChild.append(c));
  }
  putFavoriteBackInContainer(value) {
    super.PUT(value, (c) => this.entity.archive.firstElementChild.append(c));
  }
  putCollectionOnOrOffDisplay(value) {
    super.PUT(value, (c) => (c.hidden = c.hidden ? false : true));
  }
  deleteFromArchiveCollection(value) {
    if (value.user.authenticated) this.#api.DELETE("", value.user);
    this.#deleteArchivedCoin(value.name);
    super.DELETE(value.coin, (c) => c.remove());
  }
  deleteArchivedCoin(value) {
    this.#browser.deleteItemInLocalByKey("archive", value);
  }
}
