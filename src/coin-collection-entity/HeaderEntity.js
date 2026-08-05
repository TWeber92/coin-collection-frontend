export class HeaderEntity {
  #node;
  #badgeId;
  constructor(dto) {
    this.#node = [
      ...new DOMParser().parseFromString(dto.template, "text/html").body
        .children,
    ];
    this.#badgeId = dto.id;
  }

  #toJSON() {
    return {
      node: this.#node,
      badgeId: this.#badgeId,
    };
  }

  static fromDTO(dto) {
    return new HeaderEntity(dto).#toJSON();
  }
}
