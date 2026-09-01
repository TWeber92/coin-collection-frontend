export class AuthEntity {
  #node;
  #form;
  #button;
  #sibling;
  #inputs;
  constructor(dto) {
    this.#node = new DOMParser().parseFromString(
      dto.template,
      "text/html",
    ).body.children;
    this.#form = dto.form;
    this.#button = dto.button;
    this.#sibling = dto.sibling;
    this.#inputs = dto.inputs;
  }

  #toJSON() {
    return {
      node: this.#node,
      form: this.#form,
      button: this.#button,
      sibling: this.#sibling,
      inputs: this.#inputs,
    };
  }

  static fromDTO(dto) {
    return new AuthEntity(dto).#toJSON();
  }
}
