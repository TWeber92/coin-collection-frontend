export class PageDTO {
  #entity;
  #wasClosed;

  constructor(data) {
    this.#entity = data.entity;
    this.#wasClosed = data.wasClosed;
  }

  to() {
    return {
      entity: this.#entity,
      wasClosed: this.#wasClosed,
    };
  }

  static from(data) {
    return new PageDTO(data);
  }
}
