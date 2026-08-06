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
  getCollectionContainerBySet(value) {
    const set = `[data-collection='${value}']`;
    return super.GET(set, (ds) => this.entity.querySelector(ds));
  }
  postCollectionPage(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  putCollectionInPageContainer(value) {
    super.PUT(value, (v) => v.con.append(v.col));
  }
}
