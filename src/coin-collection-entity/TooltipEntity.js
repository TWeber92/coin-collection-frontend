export class TooltipEntity {
  static #toolTip;
  #node;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto,
      "text/html",
    ).body.children;
  }

  #toJSON() {
    return {
      node: this.#node,
      tooltip: TooltipEntity.#toolTip,
    };
  }
  static fromDTO(dto) {
    return new TooltipEntity(dto).#toJSON();
  }
}
