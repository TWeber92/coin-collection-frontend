import { HeaderDTO } from "./HeaderDTO";
import { UserDTO } from "./UserDTO";

export class CollectionDTO {
  #id;
  #favorites;
  #archive;
  #coin;
  #coins;
  #user;
  #names = {};
  constructor(entity) {
    entity = { ...this.#toJSON(), ...entity };
    this.#favorites = `
            <div id="favorites-collection" class="collection-container">
              <h3>⭐ Favorites</h3>
              <div id="favorites" hidden=true></div>
            </div>`;
    this.#archive = `
            <div id="archive-collection" class="collection-container">
              <h3>📦 Archive</h3>
              <div id="archive" hidden=true></div>
            </div>`;
    this.#id = entity.id;
    this.#coin = entity.coin;
    this.#coins = entity.coins;
    this.#names = entity.names;
    this.#user = UserDTO.fromEntity({ collection: this.collection });
    HeaderDTO.fromEntity({ collection: this.collection });
  }

  get collection() {
    return {
      favorites: {
        names: this.#names.favorites,
        count: this.#names.favorites?.length,
      },
      removed: {
        names: this.#names.archive,
        count: this.#names.archive?.length,
      },
    };
  }

  #toJSON() {
    return {
      id: this.#id,
      favorites: this.#favorites,
      archive: this.#archive,
      coin: this.#coin,
      names: this.#names,
      user: this.#user,
    };
  }
  static fromEntity(entity) {
    return new CollectionDTO(entity);
  }
}
