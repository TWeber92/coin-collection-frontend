import { CollectionDTO } from "../coin-collection-dto/CollectionDTO.js";
import { CollectionEntity } from "../coin-collection-entity/CollectionEntity.js";
import { CollectionRepository } from "../coin-collection-repository/CollectionRepository.js";

export class CollectionService {
  constructor() {
    this.#repo = new CollectionRepository({
      collection: this.#getFavoritesCollection(),
    });
  }

  #repo;

  #getFavoritesCollection() {
    const dto = CollectionDTO.fromEntity({});
    const entity = CollectionEntity.fromDTO({ template: dto.favorites });
    return { favorites: entity.node[0] };
  }

  #getArchivedCollection() {
    const dto = CollectionDTO.fromEntity({});
    const entity = CollectionEntity.fromDTO({ template: dto.archive });
    this.#repo.putArchiveCollectionInEntity(entity.node[0]);
  }
  async getUserSyncedCollection(body) {
    // const user = structuredClone(body.user);
    // const authenticated = body.authenticated !== false;
    const dto = CollectionDTO.fromEntity(body);
    const local = {
      favorites: this.#repo.getLocalStorageByKey(dto.favoritesId),
      archive: this.#repo.getLocalStorageByKey(dto.archiveId),
    };
    // dto.names = {
    //   favorites: authenticated
    //     ? Set(...user.collection.favorites, ...local.favorites)
    //     : local.favorites,
    //   archive: authenticated
    //     ? Set(...user.collection.archive, ...local.archive)
    //     : local.archive,
    // };
    if (local.archive.length) this.#getArchivedCollection();
    dto.names.favorites = local.favorites;
    dto.names.archive = local.archive;
    return CollectionDTO.fromEntity({ names: dto.names });
    // return { ...CollectionDTO.fromEntity({ names: dto.names }), authenticated };
  }
  getCollectionById(body) {
    const collection = this.#repo.getCollectionById({ id: body.collectionId });
    const dto = CollectionDTO.fromEntity({ ...body, collection });
    console.log(dto.collection);

    return CollectionEntity.fromDTO(dto);
  }
  getCoinFromArchiveCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    return this.#repo.getCoinFromArchiveCollection(dto.name);
  }
  getCollectedFavoriteNames(body) {
    const dto = CollectionDTO.fromEntity(body);
    return dto.names[dto.favoritesId];
  }

  async postToFavoritesCollection(body) {
    await this.#putCoinInFavoritesCollection(body);
  }

  async putFavoriteInArchiveCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    if (!this.getCollectionById({ collectionId: dto.archiveId }).collection)
      this.#getArchivedCollection();
    const remove = (favorites) => favorites.filter((f) => f !== dto.name);
    const userCollection = structuredClone(dto.user.collection);
    userCollection.archive.push(dto.name);
    userCollection.favorites = remove(userCollection.favorites);
    const user = {
      ...dto.user,
      collection: { userCollection },
    };
    const entity = CollectionEntity.fromDTO({
      ...dto,
      user,
    });
    await this.#repo.postToArchiveCollection({
      id: { aid: entity.archiveId, fid: entity.favoritesId },
      name: entity.name,
      coin: entity.coin,
      user: entity.user,
    });
    entity.coin.dataset.location = entity.archiveId;
    dto.names.favorites = userCollection.favorites;
    dto.names.archive = userCollection.archive;
    CollectionDTO.fromEntity({ names: dto.names });
  }
  async putArchivedInFavoritesCollection(body) {
    await this.#putCoinInFavoritesCollection(body);
  }
  async #putCoinInFavoritesCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    const remove = (archived) => archived.filter((f) => f !== dto.name);
    const userCollection = structuredClone(dto.user.collection);
    userCollection.favorites.push(dto.name);
    userCollection.archive = remove(userCollection.archive);
    const user = {
      ...dto.user,
      collection: { userCollection },
    };
    const entity = CollectionEntity.fromDTO({
      ...dto,
      user,
    });
    await this.#repo.postToFavoritesCollection({
      id: { aid: entity.archiveId, fid: entity.favoritesId },
      name: entity.name,
      coin: entity.coin,
      user: entity.user,
    });
    entity.coin.dataset.location = entity.favoritesId;
    dto.names.favorites = userCollection.favorites;
    dto.names.archive = userCollection.archive;
    CollectionDTO.fromEntity({ names: dto.names });
    //This updates other DTOs, the function is still continuing in the handler.
  }
  putAllFavoritesInCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    entity.coins.forEach((c) => this.#repo.putFavoriteBackInContainer(c));
  }
  putCollectionOnOrOffDisplay(body) {
    const { collection } = CollectionDTO.fromEntity(body);
    this.#repo.putCollectionOnOrOffDisplay(collection);
  }
  async deleteArchivedFromCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    const remove = (archived) => archived.filter((a) => a !== dto.name);
    const userCollection = structuredClone(dto.user.collection);
    userCollection.archive = remove(userCollection.archive);
    const user = {
      ...dto.user,
      collection: { userCollection },
    };
    const entity = CollectionEntity.fromDTO({
      ...dto,
      user,
    });
    await this.#repo.deleteFromArchiveCollection({
      id: { aid: entity.archiveId },
      name: entity.name,
      coin: entity.coin,
      user: entity.user,
    });
    dto.names.archive = userCollection.archive;
    CollectionDTO.fromEntity({ names: dto.names });
  }
}
