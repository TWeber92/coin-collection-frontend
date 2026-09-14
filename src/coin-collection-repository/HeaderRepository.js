import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class HeaderRepository extends DocumentClient {
  constructor() {
    super();
  }

  #entity = { header: this.#getHeaderElement() };

  #getHeaderElement() {
    return document.body.appendChild(
      DocumentStore.createHeaderElement({
        id: "header",
        className: "doc-header",
      }).node,
    );
  }
  // getMenuNavSibling() {
  //   return super.GET(this.#entity, (e) => e.nextElementSibling);
  // }
  getMenuButtonById(value) {
    return super.GET(value, (id) => this.#entity.header.querySelector(id));
  }
  getBadgesFromEntity(value) {
    const entity = this.#entity.nav.children.length
      ? this.#entity.nav
      : this.#entity.header;
    return super.GET(value, (id) => entity.querySelectorAll(id));
  }
  getExistingArchiveButton(value) {
    return super.GET(value, (id) => {
      const nav = this.#entity.nav.children[id];
      const header = this.#entity.header.querySelector(`#${id}`);
      return !!nav || !!header;
    });
  }
  // getBadgesfromNav(value) {
  //   return super.GET(value, (id) => this.#entity.nav.querySelectorAll(id));
  // }
  // getBadgesFromHeader(value) {
  //   return super.GET(value, (id) => this.#entity.header.querySelectorAll(id));
  // }
  getNavItemsFromDocBody() {
    return super.GET(document.body, (b) =>
      b.querySelectorAll("[data-nav-item]"),
    );
  }
  getFavoritesButtonFromEntity(value) {
    return super.GET(value, (id) =>
      this.#entity.nav.hidden
        ? this.#entity.header.querySelector(`#${id}`)
        : this.#entity.nav.children[id],
    );
  }
  putArchiveButtonInEntity(value) {
    super.PUT(value, (v) =>
      this.#entity.nav.hidden
        ? this.#entity.header.querySelector(value.id).append(v.b)
        : this.#entity.nav.append(v.b),
    );
  }
  putNavItemsInMenu(value) {
    super.PUT(value, (v) => v.menu.append(...v.items));
  }
  putNewMenuButtonInHeader(value) {
    super.PUT(
      value,
      (mb) => (mb.textContent = this.#entity.nav.hidden ? "☰" : "✕"),
    );
  }
  putContextInHeader(value) {
    super.PUT(value, (c) => this.#entity.header.append(...c));
  }
  putNavAfterHeader(value) {
    this.#entity.nav = value;
    super.PUT(value, (n) => this.#entity.header.after(n));
  }
  putNewCountInBadge(value) {
    super.PUT(value, (e) => (e.b.textContent = e.c));
  }
  putMenuNavOnOffDisplay(value) {
    const hidden = this.#entity.nav.hidden;
    this.#entity.nav.hidden = hidden ? false : true;
    this.#entity.nav.hidden
      ? super.PUT(value, (btns) =>
          this.#entity.header.querySelector("menu").append(...btns),
        )
      : super.PUT(value, (btns) => this.#entity.nav.append(...btns));
    document.body.dataset.overlay = this.#entity.nav.hidden ? "false" : "true";
  }
}
