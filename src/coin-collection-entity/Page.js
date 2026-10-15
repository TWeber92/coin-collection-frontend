export class Page {
  #page;
  #header;
  #body;
  #footer;

  constructor(data) {
    this.#page = data.page;
    this.#header = data.header;
    this.#body = data.body;
    this.#footer = data.footer;
  }

  to() {
    return {
      page: this.#page,
      header: this.#header,
      body: this.#body,
      footer: this.#footer,
    };
  }

  static from(data) {
    return new Page(data);
  }
}
