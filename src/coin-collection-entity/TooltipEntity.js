export class TooltipEntity {
  #button;
  #node;
  #coin;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#coin = dto.coin;
    this.#button = dto.button;
  }

  #toJSON() {
    return {
      button: new TooltipEntity({ template: this.#button }).#node,
      node: this.#node,
      coin: this.#coin,
    };
  }
  static fromDTO(dto) {
    return new TooltipEntity(dto).#toJSON();
  }
}
