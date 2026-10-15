import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class PageRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  get entity() {
    return this.#entity;
  }

  getPageContextWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  getBodySectionById(id) {
    return super.GET(id, (id) => {
       const body = this.#entity.children[1]
       if(body) return body[id]
    });
  }
  getFooterContentById(id) {
    return super.GET(`[name=${id}]`, (id) => this.#entity.querySelectorAll(id));
  }
  putCollectionInPageById(context) {
    super.PUT(context, ({ id, c }) => {
      const body = this.#entity.children[1];
      body.children[id].append(c);
    });
  }
  putPageTogether(entity) {
    super.PUT(entity, ({ page, header, body, footer }) => {
      const [h, b, f] = page;
      h.append(...header);
      b.append(...body);
      f.append(...footer);
      this.#entity.replaceChildren(h, b, f);
    });
  }
  putAboutPageTogether(entity) {
    this.putPageTogether(entity)
  }
  putCollectionPageTogether(entity) {
    this.putPageTogether(entity)
  }
  putPageOnOffDisplay() {
    super.PUT(this.#entity, (e) => {
      e.hidden = !e.hidden;
      document.body.dataset.overlay = e.hidden ? "false" : "true";
    });
  }
  putArchiveInNewPosition(context) {
    super.PUT(context, ({ a, d }) =>
      a.lastChild.scrollBy({
        left: d,
        behavior: "smooth",
      }),
    );
  }
  putArrowInNewOrientation(context) {
    super.PUT(context, ({ col, id }) => {
      const body = this.#entity.children[1];
      const container = body.children[id];
      const button = container.firstChild.children[id];
      button.textContent = col.hidden ? "﹀" : "︿";
    });
  }
  deleteArchiveButton() {
    super.DELETE(this.#entity.children[1], (body) => body.lastChild.remove());
  }
}
