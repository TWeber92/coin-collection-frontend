import { DocumentStore } from "../DocumentStore.js";

export class TooltipView {
  #svg;
  #addTooltip;
  #archiveTooltip;
  #restoreOrDeleteTooltip;

  constructor(data) {
    this.#html = data;
  }

  // #entity = this.#getTooltipElement();

  get entity() {
    return this.#getTooltipElement();
  }

  #getTooltipElement() {
    return document.body.appendChild(
      DocumentStore.createDivElement({
        id: "tooltip",
        className: "tooltip-wrapper",
        hidden: true,
      }).node,
    );
  }

  set #html(data) {
    this.position = (sweep, top, bottom, full) =>
      sweep != null ? (sweep ? top : bottom) : full;
    this.#svg = `<svg viewBox=
                   "${this.position(
                     data.sweep,
                     "0 0 120 60",
                     "0 60 120 60",
                     "0 0 120 120",
                   )}">
                   <defs>
                     <path id="arc${this.position(data.sweep, "-top", "-bottom", "")}" d="M 20,60 A 40,40 0 1,${data.sweep ?? 1} 100,60" />
                   </defs>
                   <circle cx="60" cy="60" r="55"/>
                   <text dominant-baseline="text-${this.position(data.sweep, "after", "before", "")}-edge">
                     <textPath href="#arc${this.position(data.sweep, "-top", "-bottom", "")}" startOffset="50%" text-anchor="middle"> ${data.coin?.id}?</textPath>
                   </text>
                   <text x="60" 
                     y="${this.position(data.sweep, "40", "80", "60")}" 
                     text-anchor="middle" 
                     dominant-baseline="central" 
                     style="font-size: 20px">
                   </text>
                 </svg>`;
    this.#addTooltip = `<button id="tooltip" value="coin" data-action="add">Add ⭐</button>`;
    this.#archiveTooltip = `<button id="tooltip" value="coin" data-action="archive">Archive ❌</button>`;
    this.#restoreOrDeleteTooltip = `
      <button id="tooltip" value="coin" data-action="delete">Delete 🗑️</button>
      <button id="tooltip" value="coin" data-action="restore">Restore ♻️</button>
    `;
  }
  #to() {
    return {
      svg: this.#svg,
      add: this.#addTooltip,
      archive: this.#archiveTooltip,
      resOrDel: this.#restoreOrDeleteTooltip,
    };
  }
  static from(data) {
    return new TooltipView(data).#to();
  }
}
