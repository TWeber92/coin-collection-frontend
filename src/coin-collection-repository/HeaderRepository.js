import { DocumentStore } from "../DocumentStore";
import { DocumentClient } from "./DocumentClient";

export class HeaderRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getHeaderElement(props) {
    return DocumentStore.createHeaderElement(props).appendTo(document.body);
  }
  getMenuNav() {
    return super.GET(this.entity, (e) => e.nextElementSibling);
  }
  getBadgesfromNav(value) {
    return super.GET(value, (v) => v.nav.querySelectorAll(v.id));
  }
  getBadgesFromHeader(value) {
    return super.GET(value, (id) => this.entity.querySelectorAll(id));
  }
  updateMenuIcon(value) {
    super.PUT(value, (v) => (v.menuBtn.textContent = v.hidden ? "☰" : "✕"));
  }
  putContextInHeader(value) {
    super.PUT(value, (c) => this.entity.append(c));
  }
  putNavAfterHeader(value) {
    super.PUT(value, (n) => this.entity.after(n));
  }
  putNewCountInBadge(value) {
    super.PUT(value, (e) => (e.b.textContent = e.c));
  }
  putMenuNavOnOffDisplay(value) {
    super.PUT(value, (v) => (v.nav.hidden = v.hidden ? true : false));
  }
}
