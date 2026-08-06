import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class TooltipRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getTooltipElement(props) {
    return document.body.appendChild(
      DocumentStore.createDivElement(props).node,
    );
  }
  getChildElement(value) {
    return value.firstElementChild;
  }
  postAddTooltip(value) {
    super.POST(value, (t) => this.entity.replaceChildren(t));
  }
  postArchiveTooltip(value) {
    super.POST(value, (t) => this.entity.replaceChildren(t));
  }
  postRestoreOrDeleteTooltip(value) {
    super.POST(value, (t) => this.entity.replaceChildren(t));
  }
  putTooltipOnDisplay(value) {
    super.PUT(value, (c) => c.prepend(this.entity));
    this.entity.hidden = false;
  }
  deleteTooltip(value) {
    super.DELETE(
      value,
      (r) => (this.entity.hidden = !r || !this.entity.contains(r)),
    );
  }
}
