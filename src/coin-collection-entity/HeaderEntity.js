export class HeaderEntity {
  #nodes;
  #badgeId;
  #menuBtnId;
  #archiveId;
  #favoritesId;
  #buttons;
  constructor(dto) {
    this.#nodes = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#badgeId = dto.bid;
    this.#menuBtnId = dto.mbi;
    this.#archiveId = dto.archiveId;
    this.#favoritesId = dto.favoritesId;
    this.#buttons = dto.buttons;
  }

  #toJSON() {
    return {
      nodes: this.#nodes,
      badgeId: this.#badgeId,
      menuBtnId: this.#menuBtnId,
      archiveId: this.#archiveId,
      favoritesId: this.#favoritesId,
      buttons: new HeaderEntity({ template: this.#buttons }).#nodes,
    };
  }

  static fromDTO(dto) {
    return new HeaderEntity(dto).#toJSON();
  }
}
