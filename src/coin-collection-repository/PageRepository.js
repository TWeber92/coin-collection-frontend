import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class PageRepository extends DocumentClient {
  constructor() {
    super();
  }

  #entity = this.#getPageElement();

  #getPageElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "overlay",
        className: "page-overlay",
        hidden: true,
      }).node,
    );
  }
  getCollectionHiddenState(value) {
    return super.GET(value.collection, (c) => c.hidden);
  }
  getCollectionById(value) {
    return super.GET(value, (v) =>
      this.#entity.querySelector(`#${v.id}-collection`),
    );
  }
  getBodySectionById(value) {
    return super.GET(value, (id) => this.#entity.querySelector(`#${id}`));
  }
  getFooterContentById(value) {
    return super.GET(value, (id) =>
      this.#entity.querySelectorAll(`[name=${id}]`),
    );
  }
  getExistingArchiveSibling(value) {
    return super.GET(value, (btn) => btn.nextSibling);
  }

  postTemplateToPageEntity(value) {
    super.POST(value, (t) => this.#entity.replaceChildren(...t));
  }
  putCollectionInPageBody(value) {
    super.PUT(value, (v) => v.b[v.id].append(v.col));
  }
  getCollectionHiddenState(value) {
    return super.GET(value, (v) => v.collection.hidden);
  }
  getPageEntityHiddenState() {
    return super.GET(this.#entity, (e) => e.hidden);
  }
  putArchiveInNewPosition(value) {
    super.PUT(value, (v) =>
      v.c.lastChild.scrollBy({
        left: v.d,
        behavior: "smooth",
      }),
    );
  }

  putCollectionPageTogether(value) {
    const [header, body, footer] = value.t;
    super.PUT(value, (v) => {
      header.append(...v.h);
      body.append(...v.b);
      footer.append(...v.f);
    });
  }
  putPageOnDisplayIfHidden() {
    // const pathUrl = window.location.pathname
    // if (hidden && pathUrl === '/') {
    //   this.#entity.hidden = false;
    //   document.body.dataset.overlay = "true";
    //   history.pushState({ method: 'getPageEntityHiddenState' }, '', '/page');
    // }
    // if (!hidden && pathUrl === '/page') {
    //   this.#entity.hidden = true;
    //   document.body.dataset.overlay = "false";
    //   history.pushState({ method: {'getPageEntityHiddenState': null} }, '', '/');
    // }
    const hidden = this.#entity.hidden;
    if (hidden) {
      this.#entity.hidden = false;
      document.body.dataset.overlay = "true";
    }
  }
}
