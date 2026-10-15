import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class TooltipRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }

  #entity;

  getCoinEntity(coin) {
    return coin.parentNode;
  }
  getTooltipWithHtml(html) {
    return super.GET(html, (t) => HtmlStore.from(t).nodes);
  }
  getModifiedPathFromSvg(svg) {
    const path = svg.querySelector("path").cloneNode(true);
    path.removeAttribute("id");
    const d = path.getAttribute("d");
    super.GET(path, (p) => p.setAttribute("d", d + " Z"));
    return path;
  }
  postTextToSvg(svg, b) {
    const [_, textPath, text2] = svg.querySelectorAll("textPath, text");
    const text = b.firstChild.splitText(b.dataset.action.length);
    super.POST([textPath, text2], (v) =>
      v.forEach((t, i) => t.prepend([b.firstChild, text][i])),
    );
  }
  postAddTooltip(tooltip) {
    super.POST(tooltip, (tt) => this.#entity.replaceChildren(tt));
  }
  postArchiveTooltip(tooltip) {
    super.POST(tooltip, (tt) => this.#entity.replaceChildren(tt));
  }
  postRestoreOrDeleteTooltip(tooltip) {
    super.POST(tooltip, (tt) => this.#entity.replaceChildren(...tt));
  }
  putSvgTextInButton(context) {
    super.PUT(context, ({ svg, b }) => b.append(svg));
    return context.b;
  }
  putTooltipOnDisplay(coin) {
    super.PUT(coin, (c) => c.prepend(this.#entity));
    this.#entity.hidden = false;
  }
  putSemiCirclePathInSvg(vector) {
    super.PUT(vector, ({ svg, sc }) => svg.querySelector("circle").after(sc));
  }
  deleteTooltip(context) {
    super.DELETE(context, ({ tt, rt, c }) => {
      this.#entity.hidden = !rt || !this.#entity.contains(rt) || !c;
      if (c) tt.remove();
    });
  }
}
