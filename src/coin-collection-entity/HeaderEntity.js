export class HeaderEntity {
  #node;
  #badgeId;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.childNodes;
    this.#badgeId = dto.id;
  }

  static fromDTO(dto) {
    return new HeaderEntity(dto);
  }
}
