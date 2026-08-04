export class ModalEntity {
  #node;
  #collectedId;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.childNodes;
    this.#collectedId = dto.id;
  }

  static fromDTO(dto) {
    return new ModalEntity(dto);
  }
}
