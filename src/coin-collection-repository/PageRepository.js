import { DocumentStore } from "../DocumentStore";
import { DocumentClient } from "./DocumentClient";

export class PageRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getPageElement(props) {
    return DocumentStore.createDivElement(props).appendTo(document.body);
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
