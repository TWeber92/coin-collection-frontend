export class PageEntity {
  static #collections
  #collection
  #node;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.childNodes;
    #collection = dto.collection
  }

  static get collections(){
    return this.#collections
  }
  static set collections(node){
    this.#collections = node
  }

  static fromDTO(dto) {
    return new PageEntity(dto);
  }
}
