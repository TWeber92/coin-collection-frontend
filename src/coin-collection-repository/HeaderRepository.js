import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class HeaderRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity
  }

  #entity

  get entity() {
    return this.#entity;
  }
  getHeaderContextWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  getMenuButtonById(menuBtnId) {
    return super.GET(menuBtnId, (id) => this.#entity.header.children[id]);
  }

  getButtonsFromEntity() {
    return super.GET(this.#entity, ({ nav, menu }) =>
      !nav.hidden ? nav.children : menu.children,
    );
  }
  getBadgesFromEntity(id) {
    return super.GET(`#${id}`, (id) => {
      const entity = this.#entity.nav.hidden
        ? this.#entity.header
        : this.#entity.nav;
      return entity.querySelectorAll(id);
    });
  }
  getExistingBadgeFromButton(button) {
    return super.GET(button, (b) => b.lastChild);
  }
  putArchiveButtonInEntity(button) {
    return super.PUT(button, (b) =>
      this.#entity.nav.hidden
        ? this.#entity.menu.append(b)
        : this.#entity.nav.append(b),
    );
  }
  putHeaderAssemblyTogether(entity) {
    super.PUT(entity, ({ title, menu, hamburger, mobile, buttons }) => {
      menu.append(...Object.values(buttons));//buttons needs to be converted to iterable
      const { header } = this.#entity;
      header.append(title, menu, hamburger);
      header.after(mobile);
      this.#entity.menu = menu;
      this.#entity.nav = mobile;
      
    });
  }
  putNewMenuButtonInHeader(menuBtn) {
    super.PUT(
      menuBtn,
      (mb) => (mb.textContent = this.#entity.nav.hidden ? "☰" : "✕"),
    );
  }
  putNewCountInBadge(context) {
    super.PUT(context, ({ b, c }) => (b.textContent = c));
  }
  putMenuNavOnOffDisplay(buttons) {
    super.PUT(buttons, (btns) => {
      const { nav, menu } = this.#entity;
      const hidden = nav.hidden;
      nav.hidden = hidden ? false : true;
      nav.hidden ? menu.append(...btns) : nav.append(...btns);
      document.body.dataset.overlay = nav.hidden ? "false" : "true";
    });
  }
}
