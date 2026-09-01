import { HeaderDTO } from "./HeaderDTO.js";
import { UserDTO } from "./UserDTO.js";

export class CollectionDTO {
  static #json = {};
  #id;
  #archiveId;
  #favorites;
  #archive;
  #collection;
  #coin;
  #coins;
  #user;
  #names = {};
  constructor(entity) {
    entity = { ...CollectionDTO.#json, ...entity };
    this.#favorites = `<div id="favorites-collection" class="collection-container" hidden><h3>State Quarters
                        </h3><div data-collection="favorites"></div></div>`;
    this.#archive = `<div id="archive-collection" class="collection-container" hidden><h3>State Quarters
                        </h3><div data-collection="archive"></div></div>`;
    this.#id = entity.collectionId;
    this.#archiveId = entity.archiveId;
    this.#coin = entity.coin;
    this.#coins = entity.coins;
    this.#names = entity.names;
    this.#collection = entity.collection;
    this.#user = UserDTO.fromEntity({ collection: this.collection });
    HeaderDTO.fromEntity({ collection: this.collection });
    CollectionDTO.#json = this.#toJSON();
  }

  get collection() {
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

  #toJSON() {
    return {
      id: this.#id,
      archiveId: this.#archiveId,
      favorites: this.#favorites,
      archive: this.#archive,
      coin: this.#coin,
      names: this.#names,
      user: this.#user,
      coins: this.#coins,
      collection: this.#collection,
    };
  }
  static fromEntity(entity) {
    return new CollectionDTO(entity).#toJSON();
  }
}
