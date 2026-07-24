export class TooltipEntity {
  static #toolTip;
  #template;
  constructor(template) {
    this.#template = new DOMParser().parseFromString(
      template,
      "text/html",
    ).body.childNodes;
  }

  static get tooltip() {
    return TooltipEntity.#toolTip;
  }
  static set tooltip(node) {
    TooltipEntity.#toolTip = node;
  }

  static fromDTO(template) {
    return new TooltipEntity(template).#template;
  }
}
