import { DocumentStore } from "../DocumentStore.js";

export class HeaderView {
  #headerContext;
  #headerBtns;

  constructor(data) {
    this.#html = data;
  }

  // #entity = { header: this.#getHeaderElement() };

  get entity() {
    return { header: this.#getHeaderElement() };
  }

  #getHeaderElement() {
    return document.body.appendChild(
      DocumentStore.createHeaderElement({
        id: "header",
        className: "doc-header",
      }).node,
    );
  }

  set #html(data) {
    this.#headerContext = `
      <h3>STATE QUARTERS</h3>
      <menu id="menu" class="nav-desktop" aria-label="Main navigation"></menu>
      <button id="hamburger" class="menu-hamburger" data-option="hamburger" aria-label="Toggle menu">
        ☰
      </button>
      <nav id="nav-menu" class="nav-mobile" hidden aria-label="Mobile navigation"></nav>
    `;
    this.#headerBtns = `
        <button id="about" ${data.user?.authenticated ? "" : "hidden"} data-nav-item class="nav-item">
          👤About
        </button>
        <button id="login" ${data.user?.authenticated ? "hidden" : ""} data-nav-item class="nav-item">
          🔑Login
        </button>
        <button id="favorites" data-nav-item class="nav-item">
          ⭐Favorites
          <span id="badge" data-badge="favorites" class="favorites-badge">0</span>
        </button>
        <button id="archive" data-nav-item class="nav-item">
          📦Archive
          <span id="badge" data-badge="archive" class="archive-badge">0</span>
        </button>`;
  }

  #to() {
    return {
      headerContext: this.#headerContext,
      headerBtns: this.#headerBtns,
    };
  }
  static from(data) {
    return new HeaderView(data).#to();
  }
}
