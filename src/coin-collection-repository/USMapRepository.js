import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";
import { APIClient } from "./APIClient.js";

export class USMapRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }
  #api = new APIClient("/assets");

  static getMapLayout(props) {
    return document.body.appendChild(
      DocumentStore.createDivElement(props).node,
    );
  }
  getForeignObjectSVG(value) {
    return super.GET(value, (p) =>
      DocumentStore.createForeignObjectElement(p).appendTo(document.body),
    );
  }
  getSvgUSMapText(value) {
    return this.#api.GET(value);
  }
  getAllForeignObjects(value) {
    return super.GET(value, (id) => this.entity.querySelectorAll(id));
  }
  getCoinFromForeignObj(value) {
    return super.GET(value, (v) => v.fo.querySelector(v.id));
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
      this.entity.querySelector(`path[data-name='${n}']`),
    );
  }
  getForeignObjByName(value) {
    return super.GET(value, (n) =>
      this.entity.querySelector(`foreignObject[data-name='${n}']`),
    );
  }
  getAllPathsFromSVG(value) {
    return super.GET(value, (p) => this.entity.querySelectorAll(p));
  }
  getAllFavoriteCoins(value) {
    return super.GET(value, (v) => v.f.querySelectorAll(v.id));
  }
  putMapInEntity(value) {
    super.PUT(value, (svg) => this.entity.append(svg));
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
    super.PUT(value, (v) => v.map.append(v.path, v.siblings.next));
  }
  putPathAndSiblingFirst(value) {
    super.PUT(value, (v) => v.map.prepend(v.path, v.siblings.next));
  }
  putPathAndSiblingBack(value) {
    super.PUT(value, (v) => v.sibling.previous.after(v.path, v.sibling.next));
  }
  putCoinInForiegnObject(value) {
    super.PUT(value, (v) => v.fo.append(v.c));
  }
  putForeignObjAfterPath(value) {
    super.PUT(value, (svg) => svg.path.after(svg.fo));
  }
  putMapOnOffDisplay() {
    super.PUT(
      window.matchMedia("(max-width: 768px)").matches,
      (m) => (this.entity.hidden = m),
    );
  }
}
