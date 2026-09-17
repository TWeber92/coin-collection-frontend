import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";
import { APIClient } from "./APIClient.js";

export class USMapRepository extends DocumentClient {
  constructor() {
    super();
  }
  #api = new APIClient("./assets");
  #entity = this.#getMapLayout();

  #getMapLayout() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "usmap",
        className: "usmap-layout",
      }).node,
    );
  }
  getForeignObjectSVG(value) {
    return super.GET(value, (p) =>
      document.body.appendChild(
        DocumentStore.createForeignObjectElement(p).node,
      ),
    );
  }
  getSvgUSMapText(value) {
    return this.#api.GET(value);
  }
  getAllForeignObjects(value) {
    return super.GET(value, (tag) => this.#entity.querySelectorAll(tag));
  }
  getCoinFromForeignObj(value) {
    return super.GET(value, (fo) => fo.firstChild);
  }
  getCollectionContainer(value) {
    return super.GET(value, (c) => c.lastChild);
  }
  getPathAndPreviousSibling(value) {
    const name = `[data-name='${value.name}']`;
    const path = super.GET(value, (v) => v.map.querySelector(name));
    return {
      path,
      sibling: super.GET(path, (p) => p.previousElementSibling),
      name: value.name,
    };
  }
  getNextAndPreviousSibling(value) {
    return {
      next: super.GET(value, (p) => p.nextElementSibling),
      previous: super.GET(value, (p) => p.previousElementSibling),
    };
  }
  getStatePathByName(value) {
    return super.GET(value, (n) =>
      this.#entity.querySelector(`path[data-name='${n}']`),
    );
  }
  getForeignObjByName(value) {
    return super.GET(value, (n) =>
      this.#entity.querySelector(`foreignObject[data-name='${n}']`),
    );
  }
  getAllPathsFromSVG(value) {
    return super.GET(value, (p) => this.#entity.querySelectorAll(p));
  }
  getAllFavoriteCoins(value) {
    return super.GET(value, (f) => f.children);
  }
  putMapInEntity(value) {
    super.PUT(value, (svg) => this.#entity.append(svg));
  }
  putStatePathBack(value) {
    super.PUT(value, (v) => v.sibling.after(v.path));
  }
  putForeignObjectLast(value) {
    super.PUT(value, (v) => v.map.append(v.fo));
  }
  putForeignObjectBack(value) {
    super.PUT(value, (v) => v.siblings.previous.after(v.fo));
  }
  putPathAndSiblingLast(value) {
    const children =
      value.siblings.next.tagName === "foreignObject"
        ? [value.path, value.siblings.next]
        : [value.path];
    super.PUT(value, (v) => v.map.append(...children));
  }
  putPathAndSiblingFirst(value) {
    const children =
      value.siblings.next.tagName === "foreignObject"
        ? [value.path, value.siblings.next]
        : [value.path];
    super.PUT(value, (v) => v.map.prepend(...children));
  }
  putPathAndSiblingBack(value) {
    const children =
      value.siblings.next.tagName === "foreignObject"
        ? [value.path, value.siblings.next]
        : [value.path];
    super.PUT(value, (v) => v.siblings.previous.after(...children));
  }
  putCoinInForeignObject(value) {
    super.PUT(value, (v) => v.fo.append(v.c));
  }
  putForeignObjAfterPath(value) {
    super.PUT(value, (svg) => svg.path.after(svg.fo));
  }
  putMapOnOffDisplay() {
    super.PUT(
      window.matchMedia("(max-width: 768px)").matches,
      (m) => (this.#entity.hidden = m),
    );
  }
}
