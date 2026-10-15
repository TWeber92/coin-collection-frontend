import { DocumentStore } from "../DocumentStore.js";

export class UsMapView {
  #svg;
  constructor(data) {
    this.#text = data.text || "";
  }

  // #entity = { usmap: this.#getMapLayout() };

  get entity() {
    return { usmap: this.#getMapLayout() };
  }

  #getMapLayout() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "usmap",
        className: "usmap-layout",
      }).node,
    );
  }

  set #text(text) {
    this.#svg = text.replace(/<path[^>]*\bid="DC"[^>]*\/>/gi, "");
  }

  #to() {
    return {
      svg: this.#svg,
    };
  }

  static from(data) {
    return new UsMapView(data).#to();
  }
}
