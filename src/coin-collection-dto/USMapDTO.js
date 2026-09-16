import { CarouselDTO } from "./CarouselDTO.js";

export class USMapDTO {
  static #json = {};
  #pathSiblings;
  #foSiblings;
  #navPaths;
  #index;
  #path;
  #paths;
  #template;
  #favorites;
  #fo;
  #foTag;
  #name;
  #coin;
  #coinId;
  // #width;
  // #height;
  #size;
  #x;
  #y;
  constructor(entity) {
    entity = { ...USMapDTO.#json, ...entity };
    this.#pathSiblings = entity.pathSiblings;
    this.#foSiblings = entity.foSiblings;
    this.#navPaths = entity.navPaths;
    this.#path = entity.path;
    this.#paths = entity.paths;
    this.#index = entity.index;
    this.#template = entity.html;
    this.#favorites = entity.collection;
    this.#fo = entity.fo;
    this.#foTag = entity.foTag;
    this.#name = entity.coin?.id;
    this.#coin = entity.coin;
    this.#coinId = entity.coinId;
    // this.#width = entity.size;
    // this.#height = entity.size;
    // this.x = entity.x;
    // this.y = entity.y;
    USMapDTO.#json = this.#toJSON();
  }

  #toJSON() {
    return {
      index: this.#index,
      template: this.#template,
      favorites: this.#favorites,
      paths: this.#paths,
      path: this.#path,
      fo: this.#fo,
      foTag: this.#foTag,
      pathSiblings: this.#pathSiblings,
      foSiblings: this.#foSiblings,
      navPaths: this.#navPaths,
      name: this.#name,
      coin: this.#coin,
      ccoinId: this.#coinId,
      // width: this.#width,
      // height: this.#height,
      size: this.#size,
      x: this.#x,
      y: this.#y,
    };
  }
  static fromEntity(entity) {
    CarouselDTO.fromEntity(entity);
    return new USMapDTO(entity).#toJSON();
  }
}
