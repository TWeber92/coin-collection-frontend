import { HtmlStore } from "../HtmlStore.js";
import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { DocumentClient } from "./DocumentClient.js";

export class CollectionRepository extends DocumentClient {
  constructor(view, api, local, mq) {
    super();
    this.#api = api;
    this.#local = local
    this.#entity = view.entity;
    this.#mq = mq
  }

  #mq;
  #entity;
  #api;
  #local;

  get entity() {
    return this.#entity;
  }
  getCollectionWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  getCollectionById(collectionId) {
    return super.GET(collectionId, (id) => this.#entity[id]);
  }
  getCoinFromArchiveCollection(coinId) {
    return super.GET(
      coinId,
      (id) => this.#entity.archive?.lastChild.children[id],
    );
  }
  async postToFavoritesCollection(context) {
    const coin = context.c;
    const result = context.auth
      ? await this.#local.PUT("/api/user/collection", {
          collection: context.uc,
        })
      : {};
    if (result.message) return result;
    if (this.#mq)
      super.POST(coin, (c) => this.#entity.favorites.lastChild.append(c));
    return result;
  }
  async postToArchiveCollection(context) {
    const coin = context.c;
    const result = context.auth
      ? await this.#local.PUT("/api/user/collection", {
          collection: context.uc,
        })
      : {};
    if (result.message) return result;
    super.POST(coin, (c) => this.#entity.archive.lastChild.append(c));
    return result;
  }
  putCollectionInEntity(collection) {
    const key = collection.lastChild.dataset.collection;
    if (!this.#entity[key]) this.#entity[key] = collection;
  }
  putCollectionOnOrOffPage(context) {
    super.PUT(context, ({ c, p }) => {
      c.hidden = !p.hidden ? !c.hidden : c.hidden;
      if (p.wasClosed) c.hidden = false;
    });
  }
  putFavoriteBackInContainer(coin) {
    super.PUT(coin, (c) => this.#entity.favorites.lastChild.append(c));
  }
  async deleteFromArchiveCollection(context) {
    const coin = context.c;
    const result = context.auth
      ? await this.#local.PUT("/api/user/collection", {
          collection: context.uc,
        })
      : {};
    if (result.message) return result;
    super.DELETE(coin, (c) => c.remove());
    return result;
  }
  deleteCoinsFromCollection(id) {
    super.DELETE(id, (id) => this.#entity[id].lastChild.replaceChildren());
  }
}
