import { DocumentStore } from "../DocumentStore";
import { DocumentClient } from "./DocumentClient";

export class TooltipRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getTooltipElement(props) {
    return DocumentStore.createDivElement(props).appendTo(document.body);
  }
  getChildElement(value) {
    return value.firstElementChild;
  }
  postAddTooltip(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  postArchiveTooltip(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  postRestoreOrDeleteTooltip(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  putTooltipOnDisplay(value) {
    super.PUT(this.entity, (c) => value.append(c));
    this.entity.hidden = false;
  }
  deleteTooltip() {
    this.entity.hidden = true;
  }
}
