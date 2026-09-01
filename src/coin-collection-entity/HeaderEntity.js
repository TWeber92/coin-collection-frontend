export class HeaderEntity {
  #nodes;
  #badgeId;
  #menuBtnId;
  #buttons;
  constructor(dto) {
    this.#nodes = [
      ...new DOMParser().parseFromString(dto.template, "text/html").body
        .children,
    ];
    this.#badgeId = dto.bid;
    this.#menuBtnId = dto.mbi;
    this.#buttons = dto.buttons;
  }

  #toJSON() {
    return {
      nodes: this.#nodes,
      badgeId: `#${this.#badgeId}`,
      menuBtnId: `#${this.#menuBtnId}`,
      buttons: new HeaderEntity({ template: this.#buttons }).#nodes,
    };
  }

  static fromDTO(dto) {
    return new HeaderEntity(dto).#toJSON();
  }
}
