import { DocumentClient } from "./DocumentClient";

export class TooltipRepository extends DocumentClient {
  constructor(entity) {
    super(entity, () => {});
  }

  #getChildElement(element) {
    return element.firstElementChild;
  }
  #postAddTooltip(element) {
    this.base = this.base.replaceChildren;
    return super.POST(element);
  }
  #postArchiveTooltip(element) {
    this.base = this.base.replaceChildren;

    return super.POST(element);
  }
  #postRestoreOrDeleteTooltip(element, body) {
    this.method = body.replaceChildren.bind(body);
    super.POST(element);
    this.#putTooltipOnDisplay(body);
  }
  #putTooltipOnDisplay(body) {
    this.method = (c) => this.element.append(c);
    super.POST(body);
    this.element.hidden = false;
  }
  #deleteTooltip(body) {
    this.element.hidden = true;
  }
}
