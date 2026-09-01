export class AuthDTO {
  #form;
  #button;
  #sibling;
  #inputs;
  #template;
  constructor(entity) {
    this.#form = entity.input.form;
    this.#button = entity.input.form[entity.button];
    this.#sibling = entity.span;
    this.#inputs = entity.inputs;
    this.#template = "<span>Nailed it! 🔨</span>";
  }

  #toJSON() {
    return {
      form: this.#form,
      button: this.#button,
      sibling: this.#sibling,
      inputs: this.#inputs,
      template: this.#template,
    };
  }

  static fromEntity(entity) {
    return new AuthDTO(entity).#toJSON();
  }
}
