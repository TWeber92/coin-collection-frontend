import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";
import { APIClient } from "./APIClient.js";
import { BrowserRepository } from "./BrowserRepository.js";
import { HtmlStore } from "../HtmlStore.js";

export class USMapRepository extends DocumentClient {
  constructor(view, asset, browser) {
    super();
    this.#entity = view.entity;
    this.#asset = asset
    this.#browser = browser
  }
  #asset 
  #browser
  #entity;

  get entity() {
    return this.#entity;
  }

  getForeignObjectSVG(props) {
    return super.GET(props, (p) =>
      document.body.appendChild(
        DocumentStore.createForeignObjectElement(p).node,
      ),
    );
  }
  async getUSMapSvgText() {
    const session = this.#browser.getSessionStorageByKey("svg");
    const usmap = session[this.#entity.usmap.id];
    return usmap || (await this.#asset.GET("/us.svg"));
  }

  getCollectionFromContainer(container) {
    return super.GET(container, (c) => c.lastChild);
  }
  getForeignObjByName(name) {
    return super.GET(name, (n) =>
      this.#entity.svg.querySelector(`foreignObject[data-name='${n}']`),
    );
  }
  getStatePathByName(name) {
    return super.GET(name, (n) =>
      this.#entity.svg.querySelector(`path[data-name='${n}']`),
    );
  }
  getCoinFromForeignObj(foreignObject) {
    return super.GET(foreignObject, (fo) => fo.firstChild);
  }
  getAllForeignObjects(tag) {
    return super.GET(tag, (t) => this.#entity.svg.querySelectorAll(t));
  }
  getNextAndPreviousSibling(path) {
    return super.GET(path, (p) => {
      return { next: p.nextSibling, previous: p.previousSibling };
    });
  }
  getAllFavoriteCoins(favorites) {
    return super.GET(favorites, (f) => f.children);
  }
  getAllPathsFromSVG(tagName) {
    return super.GET(tagName, (tn) => this.#entity.svg.querySelectorAll(tn));
  }
  getPathAndPreviousSibling(name) {
    return super.GET(name, (n) => {
      const path = this.#entity.svg.querySelector(`[data-name='${n}']`);
      const sibling = path.previousSibling;
      return { path, sibling, name };
    });
  }
  putMapInEntity(svg) {
    super.PUT(svg, (map) => this.#entity.svg.append(map));
  }
  putMapOnDisplay(text) {
    const svg = HtmlStore.from(text).nodes[0];
    this.#browser.putNewItemInSessionByKey(
      svg.tagName,
      this.#entity.usmap.id,
      text,
    );
    svg.setAttribute("viewBox", "80 0 1000 589");
    this.#entity.svg = svg;
    this.#entity.usmap.append(this.#entity.svg);
    this.putMapOnOffDisplay();
  }
  putPathAndSiblingFirst(vectors) {
    super.PUT(vectors, ({ path, siblings }) => {
      const children = [path];
      if (siblings.next.tagName === "foreignObject")
        children.push(siblings.next);
      this.#entity.svg.prepend(...children);
    });
  }
  putStatePathBack(vectors) {
    super.PUT(vectors, ({ path, sibling }) => sibling.after(path));
  }
  putPathAndSiblingLast(vectors) {
    super.PUT(vectors, ({ path, siblings }) => {
      const children = [path];
      if (siblings.next.tagName === "foreignObject")
        children.push(siblings.next);
      this.#entity.svg.append(...children);
    });
  }
  putPathAndSiblingBack(vectors) {
    super.PUT(vectors, ({ path, siblings }) => {
      const children = [path];
      if (siblings.next.tagName === "foreignObject")
        children.push(siblings.next);
      siblings.previous.after(...children);
    });
  }
  putCoinInForeignObject(contents) {
    super.PUT(contents, ({ fo, c }) => fo.append(c));
  }
  putForeignObjAfterPath(vectors) {
    super.PUT(vectors, ({ path, fo }) => path.after(fo));
  }
  putForeignObjectLast(foreignObject) {
    super.PUT(foreignObject, (fo) => this.#entity.svg.append(fo));
  }
  putForeignObjectBack(vectors) {
    super.PUT(vectors, ({ siblings, fo }) => 
      siblings.previous.after(fo));
  }
  putMapOnOffDisplay() {
    super.PUT(
      window.matchMedia("(max-width: 768px)").matches,
      (m) => (this.#entity.usmap.hidden = m),
    );
  }
}
