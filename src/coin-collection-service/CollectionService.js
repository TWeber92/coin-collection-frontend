import { CollectionDTO } from "../coin-collection-dto/CollectionDTO.js";
import { Collection } from "../coin-collection-entity/Collection.js";
import { APIError } from "../coin-collection-exception/CoinCollectionError.js";
import { CollectionView } from "../coin-collection-view/CollectionView.js";

export class CollectionService {
  constructor(repo, browser) {
    this.#repo = repo;
    this.#browser = browser;
  }

  #repo;
  #browser;

  putFavoritesCollectionInEntity() {
    const html = CollectionView.from(null);
    const favorites = this.#repo.getCollectionWithHtml(html.favorites);
    this.#repo.putCollectionInEntity(favorites[0]);
  }

  putArchivedCollectionInEntity() {
    const html = CollectionView.from(null);
    const archive = this.#repo.getCollectionWithHtml(html.archive);
    this.#repo.putCollectionInEntity(archive[0]);
  }

  getCoinFromArchiveCollection(name) {
    return this.#repo.getCoinFromArchiveCollection(name);
  }
  getCollectionsById(favoritesId, archiveId) {
    const favorites = this.#repo.getCollectionById(favoritesId);
    const localArchive = this.#browser.getLocalStorageByKey(archiveId);
    if (localArchive.length && !this.#repo.archive)
      this.putArchivedCollectionInEntity();
    const archive = this.#repo.getCollectionById(archiveId);
    return CollectionDTO.from({
      favorites,
      archive,
      user: {
        collection: {
          favorites: this.#browser.getLocalStorageByKey(favoritesId),
          archive: this.#browser.getLocalStorageByKey(archiveId),
        },
      },
    });
  }
  async getUserSyncedCollection(user) {
    const same = (a, b) =>
      a.length === b.length && a.every((x, i) => x === b[i]);
    const [favoritesKey, archiveKey] = Object.keys(user.collection);
    const localArchive = this.#browser.getLocalStorageByKey(archiveKey);
    if (user.collection.archive.length || localArchive.length)
      this.putArchivedCollectionInEntity();
    const localFavorites = this.#browser.getLocalStorageByKey(favoritesKey);
    const mergedFavorites = user.authenticated
      ? [...new Set([...user.collection.favorites, ...localFavorites])]
      : localFavorites;
    const rawArchive = user.authenticated
      ? [...new Set([...user.collection.archive, ...localArchive])]
      : localArchive;
    const mergedArchive = rawArchive.filter(
      (x) => !mergedFavorites.includes(x),
    );
    user.collection = { favorites: mergedFavorites, archive: mergedArchive };
    const favoritesChanged = !same(localFavorites, mergedFavorites);
    const archiveChanged = !same(localArchive, mergedArchive);
    if (favoritesChanged)
      this.#browser.putLocalStorageByKey(favoritesKey, mergedFavorites);
    if (archiveChanged)
      this.#browser.putLocalStorageByKey(archiveKey, mergedArchive);
    user.merged = favoritesChanged || archiveChanged;
    const entity = Collection.from({ ...this.#repo.entity, user });
    return CollectionDTO.from({ ...entity.to(), user });
  }

  async postToFavoritesCollection(coin, user) {
    return await this.putCoinInFavoritesCollection(coin, user);
  }

  async putFavoriteInArchiveCollection(coin, user) {
    const [favoritesKey, archiveKey] = Object.keys(user.collection);
    const archive = this.#browser.getLocalStorageByKey(archiveKey);
    if (!this.#repo.entity.archive) this.putArchivedCollectionInEntity();
    const favorites = this.#browser.getLocalStorageByKey(favoritesKey);
    const remove = (favorites) => favorites.filter((f) => f !== coin.id);
    const userCollection = structuredClone({ archive, favorites });
    userCollection.archive.push(coin.id);
    userCollection.favorites = remove(userCollection.favorites);
    const result = await this.#repo.postToArchiveCollection({
      c: coin,
      uc: userCollection,
      auth: user.authenticated,
    });
    user.collection = userCollection;
    coin.dataset.location = archiveKey;
    const message = result.message;
    if (!message) {
      this.#browser.putNewItemInLocalByKey(archiveKey, coin.id);
      user.collection = userCollection;
      coin.dataset.location = archiveKey;
      this.#browser.deleteItemInLocalByKey(favoritesKey, coin.id);
    } else user.message = new APIError(message);
    const entity = Collection.from({ ...this.#repo.entity, user });
    return CollectionDTO.from({ ...entity.to(), user });
  }

  async putArchivedInFavoritesCollection(coin, user) {
    return await this.putCoinInFavoritesCollection(coin, user);
  }
  async putCoinInFavoritesCollection(coin, user) {
    const [favoritesKey, archiveKey] = Object.keys(user.collection);
    const archive = this.#browser.getLocalStorageByKey(archiveKey);
    const favorites = this.#browser.getLocalStorageByKey(favoritesKey);
    const remove = (archived) => archived.filter((f) => f !== coin.id);
    const userCollection = structuredClone({ archive, favorites });
    userCollection.favorites.push(coin.id);
    userCollection.archive = remove(userCollection.archive);
    const result = await this.#repo.postToFavoritesCollection({
      c: coin,
      uc: userCollection,
      auth: user.authenticated,
    });
    const message = result.message;
    if (!message) {
      this.#browser.putNewItemInLocalByKey(favoritesKey, coin.id);
      user.collection = userCollection;
      coin.dataset.location = favoritesKey;
      if (this.#repo.entity.archive)
        this.#browser.deleteItemInLocalByKey(archiveKey, coin.id);
    } else user.message = new APIError(message);
    const entity = Collection.from({ ...this.#repo.entity, user });
    return CollectionDTO.from({ ...entity.to(), user });
  }
  putAllFavoritesInCollection(coins) {
    coins.forEach((c) => this.#repo.putFavoriteBackInContainer(c));
  }
  putCollectionOnOrOffPage(collection, page) {
    this.#repo.putCollectionOnOrOffPage({ c: collection, p: page });
  }

  putCoinsInRespectiveDisplays(user, usmap, favoritesKey, archiveKey) {
    const coins = usmap?.coins;
    if (coins) this.putAllFavoritesInCollection(coins);
    const { favorites, archive } = this.#repo.entity; //archive may be undefined at any time
    const names = user.collection;
    if (!names.favorites.length)
      this.#repo.deleteCoinsFromCollection(favoritesKey);
    if (!names.archive.length && this.#repo.archive)
      this.#repo.deleteCoinsFromCollection(archiveKey);
    names.favorites = names.favorites.reduce((acc, n) => {
      const favorite = favorites.lastChild.children[n];
      const archived = archive?.lastChild.children[n];
      const coin = favorite || archived;
      if (coin) favorites.lastChild.append(coin);
      else if (!favorites.lastChild.children[n]) acc.push(n);
      return acc;
    }, []);
    names.archive = names.archive.reduce((acc, n) => {
      const coin = archive?.lastChild.children[n];
      if (!coin) acc.push(n);
      return acc;
    }, []);
    const entity = Collection.from({ favorites, archive, user });
    return CollectionDTO.from(entity.to());
  }

  async deleteArchivedFromCollection(coin, user) {
    const [favoritesKey, archiveKey] = Object.keys(user.collection);
    const archive = this.#browser.getLocalStorageByKey(archiveKey);
    const favorites = this.#browser.getLocalStorageByKey(favoritesKey);
    const remove = (archived) => archived.filter((a) => a !== coin.id);
    const userCollection = structuredClone({ archive, favorites });
    userCollection.archive = remove(userCollection.archive);
    const result = await this.#repo.deleteFromArchiveCollection({
      c: coin,
      uc: userCollection,
      auth: user.authenticated,
    });
    const message = result.message;
    if (!message) {
      this.#browser.deleteItemInLocalByKey(archiveKey, coin.id);
      user.collection = userCollection;
    } else user.message = new APIError(message);
    const entity = Collection.from({ ...this.#repo.entity, user });
    return CollectionDTO.from({ ...entity.to(), user });
  }
  deleteLocalCollections(favoritesKey, archiveKey) {
    this.#browser.putLocalStorageByKey(favoritesKey, []);
    this.#repo.deleteCoinsFromCollection(favoritesKey);
    this.#browser.putLocalStorageByKey(archiveKey, []);
    this.#repo.deleteCoinsFromCollection(archiveKey);
  }
}
