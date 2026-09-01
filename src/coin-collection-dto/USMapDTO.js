import { CarouselDTO } from "./CarouselDTO.js";

export class USMapDTO {
  static #json = {};
  #siblings;
  #navPaths;
  #index;
  #paths;
  #template;
  #favorites;
  #path;
  #fo;
  #name;
  #coin;
  #width;
  #height;
  #x;
  #y;
  constructor(entity) {
    entity = { ...USMapDTO.#json, ...entity };
    this.#siblings = entity.siblings;
    this.#navPaths = entity.navPaths;
    this.#paths = entity.paths;
    this.#index = entity.index;
    this.#template = entity.html;
    this.#favorites = entity.collection?.favorites.container;
    this.#path = entity.path;
    this.#fo = entity.fo;
    this.#name = entity.coin?.dataset.name;
    this.#coin = entity.coin;
    this.#width = entity.size;
    this.#height = entity.size;
    this.x = entity.x;
    this.y = entity.y;
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
      siblings: this.#siblings,
      navPaths: this.#navPaths,
      name: this.#name,
      coin: this.#coin,
      width: this.#width,
      height: this.#height,
      x: this.#x,
      y: this.#y,
    };
  }
  static fromEntity(entity) {
    CarouselDTO.fromEntity(entity);
    return new USMapDTO(entity).#toJSON();
  }
}
