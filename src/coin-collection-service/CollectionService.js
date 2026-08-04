import { CollectionDTO } from "../coin-collection-dto/CollectionDTO";
import { CollectionEntity } from "../coin-collection-entity/CollectionEntity";

export class CollectionService extends CollectionRepository {
  constructor() {
    super(this.#getFavoritesCollection());
  }

  #getFavoritesCollection() {
    const dto = CollectionDTO.fromEntity({});
    const entity = CollectionEntity.fromDTO(dto.favorites);
    const favorites = this.getCollectionById({
      e: entity.nodes,
      id: "#favorites",
    });
    CollectionEntity.favorites = favorites;
    return { favorites: entity };
  }

  #getArchivedCollection() {
    const dto = CollectionDTO.fromEntity({});
    const entity = CollectionEntity.fromDTO(dto.archived);
    const archive = this.getCollectionById({
      e: entity.nodes,
      id: "#archive",
    });
    CollectionEntity.archive = archive;
    this.entity.archive = archive;
  }

  #getCollectionById(body) {
    const { id } = CollectionDTO.fromEntity(body);
    return CollectionEntity.collection[id];
  }

  async #postToFavoritesCollection(body) {
    const name = body.coin.dataset.name;
    const archive = this.getCollectionById("archive");
    if (archive.contains(body.coin))
      body.coin = this.getCoinFromArchiveCollection(name);
    const dto = CollectionDTO.fromEntity({ ...body, name });
    const entity = CollectionEntity.fromDTO(dto);
    const userCollection = { ...dto.user.collection };
    userCollection.favorites.push(name);
    await this.postToFavoritesCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.favorites.push(name);
    CollectionDTO.fromEntity({ names: dto.names });
  }

  async #putFavoriteInArchiveCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    if (!entity.collection.archived) this.#getArchivedCollection();
    const userCollection = { ...dto.user.collection };
    const remove = (favorites) => favorites.filter((f) => f !== name);
    userCollection.archive.push(name);
    userCollection.favorites = remove(userCollection.favorites);
    await this.postToArchiveCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.archived.push(name);
    dto.names.favorites = remove(dto.names.favorites);
    CollectionDTO.fromEntity({ names: dto.names });
  }
  async #putArchivedInFavoritesCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    const userCollection = { ...dto.user.collection };
    const remove = (archived) => archived.filter((f) => f !== name);
    userCollection.favorites.push(name);
    userCollection.archived = remove(userCollection.archived);
    await this.postToFavoritesCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.favorites.push(name);
    dto.names.archived = remove(dto.names.archived);
    CollectionDTO.fromEntity({ names: dto.names });
  }
  #putAllFavoritesInCollection(body) {
    const dto = CollectionDTO.fromEntity(body);
    dto.coins.forEach((c) => this.putFavoriteBackInContainer(c));
  }
  #putCollectionOnOrOffDisplay(body) {
    const dto = CollectionDTO.fromEntity(body);
    const collection = CollectionEntity.collection[dto.id];
    this.putCollectionOnOrOffDisplay(collection);
  }
  async #deleteArchivedFromCollection(body) {
    const name = body.coin.dataset.name;
    const dto = CollectionDTO.fromEntity(body);
    const entity = CollectionEntity.fromDTO(dto);
    const userCollection = { ...dto.user.collection };
    const remove = (archived) => archived.filter((f) => f !== name);
    userCollection.archived = remove(userCollection.archived);
    await this.deleteFromArchivedCollection({
      name,
      coin: entity.coin,
      user: { ...dto.user, collection: userCollection },
    });
    dto.names.archived = remove(dto.names.archived);
    CollectionDTO.fromEntity({ names: dto.names });
  }
}
