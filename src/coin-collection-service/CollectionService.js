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
    console.log(entity.node[0]);

    return { favorites: entity.node[0] };
  }

  #getArchivedCollection() {
    const dto = CollectionDTO.fromEntity({});
    const entity = CollectionEntity.fromDTO({ template: dto.archive });
    this.#repo.putArchiveCollectionInEntity(entity.node[0]);
  }

  getCollectionById(body) {
    const collection = this.#repo.getCollectionById({ id: body.collectionId });
    const dto = CollectionDTO.fromEntity({ ...body, collection });
    return CollectionEntity.fromDTO(dto);
  }

  async postToFavoritesCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    const name = this.#repo.getStateNameFromCoin({ c: dto.coin });
    const archive = this.#repo.getCollectionById({ id: dto.archiveId });
    console.log(archive);
    if (archive?.contains(dto.coin))
      dto.coin = this.#repo.getCoinFromArchiveCollection(name);
    const userCollection = { ...dto.user.collection };
    const favorites = [...userCollection.favorites];
    favorites.push(name);
    const entity = CollectionEntity.fromDTO(dto);
    await this.#repo.postToFavoritesCollection({
      name,
      coin: entity.coin,
      user: {
        ...dto.user,
        collection: { favorites, archive: userCollection.archive },
      },
    });
    dto.names.favorites.push(name);
    CollectionDTO.fromEntity({ names: dto.names });
    //This updates other DTOs, the function is still continuing in the handler.
  }

  async putFavoriteInArchiveCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    if (!entity.collection.archived) this.#getArchivedCollection();
    const userCollection = { ...dto.user.collection };
    const remove = (favorites) => favorites.filter((f) => f !== name);
    userCollection.archive.push(name);
    userCollection.favorites = remove(userCollection.favorites);
    await this.#repo.postToArchiveCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.archived.push(name);
    dto.names.favorites = remove(dto.names.favorites);
    CollectionDTO.fromEntity({ names: dto.names });
  }
  async putArchivedInFavoritesCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    const userCollection = { ...dto.user.collection };
    const remove = (archived) => archived.filter((f) => f !== name);
    userCollection.favorites.push(name);
    userCollection.archive = remove(userCollection.archive);
    await this.#repo.postToFavoritesCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.favorites.push(name);
    dto.names.archived = remove(dto.names.archived);
    CollectionDTO.fromEntity({ names: dto.names });
  }
  putAllFavoritesInCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    dto.coins.forEach((c) => this.#repo.putFavoriteBackInContainer(c));
  }
  putCollectionOnOrOffDisplay(body) {
    const { collection } = CollectionDTO.fromEntity(body);
    this.#repo.putCollectionOnOrOffDisplay(collection);
  }
  async deleteArchivedFromCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    const userCollection = { ...dto.user.collection };
    const remove = (archived) => archived.filter((f) => f !== name);
    userCollection.archive = remove(userCollection.archive);
    await this.#repo.deleteFromArchivedCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.archived = remove(dto.names.archived);
    CollectionDTO.fromEntity({ names: dto.names });
  }
}
