export class HtmlStore {
  #nodes;
  constructor(html) {
    this.#nodes = new DOMParser().parseFromString(
      html.replace(/>\s+</g, "><").trim(),
      "text/html",
    ).body.children;
  }

  get nodes() {
    return this.#nodes;
  }

  static from(html) {
    return new HtmlStore(html);
  }
}
