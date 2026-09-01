export class ModalEntity {
  #nodes;
  #title;
  #body;
  #footer;
  #coin;
  #collectedId;
  constructor(dto) {
    this.#nodes = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#title = dto.template?.title;
    this.#body = dto.template?.body;
    this.#footer = dto.template?.footer;
    this.#coin = dto.coin;
    this.#collectedId = dto.id;
  }

  #toJSON() {
    return {
      nodes: this.#nodes,
      title: new ModalEntity({ template: this.#title }).#nodes,
      body: new ModalEntity({ template: this.#body }).#nodes,
      footer: new ModalEntity({ template: this.#footer }).#nodes,
      coin: this.#coin,
      collectedId: this.#collectedId,
    };
  }

  static fromDTO(dto) {
    return new ModalEntity(dto).#toJSON();
  }
}
