import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class TooltipRepository extends DocumentClient {
  constructor() {
    super();
  }
  #entity = this.#getTooltipElement();

  #getTooltipElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "tooltip",
        className: "tooltip-wrapper",
        hidden: true,
      }).node,
    );
  }
  getCoinFromEntity(value) {
    return value.lastChild;
  }
  getModifiedPathFromSvg(value) {
    const path = value.querySelector("path").cloneNode(true);
    path.removeAttribute("id");
    const d = path.getAttribute("d");
    super.GET(path, (p) => p.setAttribute("d", d + " Z"));
    return path;
  }
  postAddTooltip(value) {
    super.POST(value, (t) => this.#entity.replaceChildren(t));
  }
  postArchiveTooltip(value) {
    super.POST(value, (t) => this.#entity.replaceChildren(t));
  }
  postRestoreOrDeleteTooltip(value) {
    super.POST(value, (t) => this.#entity.replaceChildren(...t));
  }
  postTextToSvg(value) {
    const [_, textPath, text2] = value.svg.querySelectorAll("textPath, text");
    const text = value.b.firstChild.splitText(value.b.dataset.action.length);
    super.POST([textPath, text2], (v) =>
      v.forEach((t, i) => t.prepend([value.b.firstChild, text][i])),
    );
  }
  putSemiCirclePathInSvg(value) {
    super.PUT(value, (v) => v.svg.querySelector("circle").after(v.sc));
  }
  putSvgTextInButton(value) {
    super.PUT(value, (v) => v.b.append(v.svg));
    return value.b;
  }
  putTooltipOnDisplay(value) {
    super.PUT(value, (c) => c.prepend(this.#entity));
    this.#entity.hidden = false;
  }
  deleteTooltip(value) {
    super.DELETE(
      value,
      (r) => (this.#entity.hidden = !r || !this.#entity.contains(r)),
    );
  }
}
