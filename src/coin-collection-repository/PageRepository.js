import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class PageRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getPageElement(props) {
    return document.body.appendChild(
      DocumentStore.createDivElement(props).node,
    );
  }
  getCollectionHiddenState(value) {
    return super.GET(value.collection, (c) => c.hidden);
  }
  getCollectionById(value) {
    return super.GET(value, (v) =>
      this.entity.querySelector(`#${v.id}-collection`),
    );
  }

  postTemplateToPageEntity(value) {
    super.POST(value, (t) => this.entity.replaceChildren(...t));
  }
  putCollectionInPageBody(value) {
    super.PUT(value, (v) => v.b[v.id].append(v.col));
  }
  getCollectionHiddenState(value) {
    return super.GET(value, (v) => v.collection.hidden);
  }
  getPageEntityHiddenState() {
    const hidden = this.entity.hidden;
    if (hidden) {
      console.log("I am here");

      this.entity.hidden = false;
      document.body.dataset.overlay = "true";
      console.log(document.body.dataset.overlay);
    }
    return hidden;
  }

  putCollectionPageTogether(value) {
    const [header, body] = value.t;
    super.PUT(value, (v) => {
      header.append(...v.h);
      body.append(...v.b);
    });
  }
}
