import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class HeaderRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getHeaderElement(props) {
    return document.body.appendChild(
      DocumentStore.createHeaderElement(props).node,
    );
  }
  getMenuNavSibling() {
    return super.GET(this.entity, (e) => e.nextElementSibling);
  }
  getMenuButtonById(value) {
    return super.GET(value, (id) => this.entity.querySelector(id));
  }
  getBadgesfromNav(value) {
    return super.GET(value, (v) => v.nav.querySelectorAll(v.id));
  }
  getBadgesFromHeader(value) {
    return super.GET(value, (id) => this.entity.querySelectorAll(id));
  }
  getNavItemsFromDocBody() {
    return super.GET(document.body, (b) =>
      b.querySelectorAll("[data-nav-item]"),
    );
  }
  putNavItemsInMenu(value) {
    super.PUT(value, (v) => v.menu.append(...v.items));
  }
  putNewIconInHeader(value) {
    super.PUT(
      value,
      (v) => (v.menuBtn.textContent = v.nav.hidden ? "☰" : "✕"),
    );
  }
  putContextInHeader(value) {
    super.PUT(value, (c) => this.entity.append(...c));
  }
  putNavAfterHeader(value) {
    super.PUT(value, (n) => this.entity.after(n));
  }
  putNewCountInBadge(value) {
    super.PUT(value, (e) => (e.b.textContent = e.c));
  }
  putMenuNavOnOffDisplay(value) {
    super.PUT(value, (v) => (v.nav.hidden = v.hidden ? false : true));
    value.nav.hidden
      ? super.PUT(value, (v) =>
          this.entity.querySelector("menu").append(...v.buttons),
        )
      : super.PUT(value, (v) => this.getMenuNavSibling().append(...v.buttons));
    document.body.dataset.overlay = value.nav.hidden ? "false" : "true";
  }
}
