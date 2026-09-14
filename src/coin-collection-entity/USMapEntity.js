export class USMapEntity {
  static #map;
  static #paths;
  #node;
  #favorites;
  #path;
  #fo;
  #fos;
  #siblings;
  #prev;
  #active;
  #next;
  #name;
  #coin;
  #coinId;
  #width;
  #height;
  #x;
  #y;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "image/svg+xml",
    ).documentElement;
    this.#favorites = dto.favorites;
    this.#path = dto.path;
    this.#fo = dto.fo;
    this.#fos = dto.fos;
    this.#siblings = dto.siblings;
    this.#prev = dto.navPaths?.[0];
    this.#active = dto.navPaths?.[1];
    this.#next = dto.navPaths?.[2];
    this.#name = dto.name;
    this.#coin = dto.coin;
    this.#coinId = dto.coinId;
    this.#width = dto.size;
    this.#height = dto.size;
    this.#x = dto.x;
    this.#y = dto.y;
  }

  static get map() {
    return USMapEntity.#map;
  }
  static set map(node) {
    USMapEntity.#map = node;
  }
  static get paths() {
    return USMapEntity.#paths;
  }
  static set paths(pathsArray) {
    USMapEntity.#paths = pathsArray;
  }

  #toJSON() {
    return {
      node: this.#node,
      favorites: this.#favorites,
      path: this.#path,
      fo: this.#fo,
      fos: this.#fos,
      siblings: this.#siblings,
      prev: this.#prev,
      active: this.#active,
      next: this.#next,
      name: this.#name,
      coin: this.#coin,
      coinId: this.#coinId,
      width: this.#width,
      height: this.#height,
      x: this.#x,
      y: this.#y,
    };
  }

  static fromDTO(dto) {
    return new USMapEntity(dto).#toJSON();
  }
}
