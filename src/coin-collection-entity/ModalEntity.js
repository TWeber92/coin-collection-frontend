export class ModalEntity {
  #node;
  #coin;
  #collectedId;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#coin = dto.coin;
    this.#collectedId = dto.id;
  }

  #toJSON() {
    return {
      node: this.#node,
      coin: this.#coin,
      collectedId: this.#collectedId,
    };
  }

  static fromDTO(dto) {
    return new ModalEntity(dto).#toJSON();
  }
}
