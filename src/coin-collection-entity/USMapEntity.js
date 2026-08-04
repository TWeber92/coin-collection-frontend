export class USMapEntity {
  static #map;
  static #paths;
  #node;
  #favorites;
  #path;
  #fo;
  #prev;
  #active;
  #next;
  #name;
  #coin;
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
    this.#siblings = { next: dto.siblings?.[0], previous: dto.siblings?.[1] };
    this.#prev = dto.paths?.[0];
    this.#active = dto.paths?.[1];
    this.#next = dto.paths?.[2];
    this.#name = dto.name;
    this.#coin = dto.coin;
    this.#width = dto.size;
    this.#height = dto.size;
    this.x = dto.x;
    this.y = dto.y;
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

  static fromDTO(dto) {
    return new USMapEntity(dto);
  }
}
