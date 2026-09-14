import { HeaderDTO } from "./HeaderDTO.js";
import { UserDTO } from "./UserDTO.js";

export class CollectionDTO {
  static #json = {};
  #id;
  #archiveId;
  #favoritesId;
  #favorites;
  #archive;
  #collection;
  #coin;
  #coins;
  #user;
  #name;
  #names;
  constructor(entity) {
    entity = { ...CollectionDTO.#json, ...entity };
    this.#html;
    this.#id = entity.collectionId;
    this.#archiveId = entity.archiveId;
    this.#favoritesId = entity.favoritesId;
    this.#coin = entity.coin;
    this.#coins = entity.coins;
    this.#name = entity.coin?.id;
    this.#names = entity.names;
    this.#collection = entity.collection;
    this.#user = UserDTO.fromEntity({
      ...entity.user,
      collection: this.#collections,
    });
    HeaderDTO.fromEntity({ collection: this.#collections });
    CollectionDTO.#json = this.#toJSON();
  }

  get #collections() {
    return {
      favorites: {
        names: this.#names?.favorites || [], //UserDTO needs the names
        count: this.#names?.favorites?.length ?? 0, //HeaderDTO needs the count
      },
      archive: {
        names: this.#names?.archive || [],
        count: this.#names?.archive?.length ?? 0,
      },
    };
  }

  get #html() {
    this.#favorites = `<div id="favorites-collection" class="collection-container" hidden><h3>Favorite Quarters</h3><div data-collection="favorites"></div></div>`;
    this.#archive = `<div id="archive-collection" class="collection-container" hidden><h3>Archived Quarters</h3><div data-collection="archive"></div></div>`;
  }

  #toJSON() {
    return {
      id: this.#id,
      archiveId: this.#archiveId,
      favoritesId: this.#favoritesId,
      favorites: this.#favorites,
      archive: this.#archive,
      coin: this.#coin,
      user: this.#user,
      coins: this.#coins,
      collection: this.#collection,
      name: this.#name,
      names: this.#names || {},
    };
  }
  static fromEntity(entity) {
    return new CollectionDTO(entity).#toJSON();
  }
}
