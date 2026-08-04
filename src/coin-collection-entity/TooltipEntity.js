export class TooltipEntity {
  static #toolTip;
  #node;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto,
      "text/html",
    ).body.childNodes;
  }

  static fromDTO(dto) {
    return new TooltipEntity(dto);
  }
}
