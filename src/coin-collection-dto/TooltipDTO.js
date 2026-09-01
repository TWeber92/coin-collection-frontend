export class TooltipDTO {
  static #json = {};
  #svg;
  #addTooltip;
  #archiveTooltip;
  #restoreOrDeleteTooltip;
  #coin;
  #relative;
  constructor(entity) {
    entity = { ...TooltipDTO.#json, ...entity };
    this.position = (sweep, top, bottom, full) =>
      sweep != null ? (sweep ? top : bottom) : full;
    this.#svg = `<svg viewBox="${this.position(entity.sweep, "0 0 120 60", "0 60 120 60", "0 0 120 120")}">
                    <defs>
                      <path id="arc${this.position(entity.sweep, "-top", "-bottom", "")}" d="M 20,60 A 40,40 0 1,${entity.sweep ?? 1} 100,60" />
                    </defs>
                    <circle cx="60" cy="60" r="55"/>
                    <text dominant-baseline="text-${this.position(entity.sweep, "after", "before", "")}-edge">
                      <textPath href="#arc${this.position(entity.sweep, "-top", "-bottom", "")}" startOffset="50%" text-anchor="middle"> ${entity.child?.id}?</textPath>
                    </text>
                    <text x="60" y="${this.position(entity.sweep, "40", "80", "60")}" text-anchor="middle" dominant-baseline="central" style="font-size: 20px">
                    </text>
                  </svg>`;
    this.#addTooltip = `<button id="tooltip" value="coin" data-action="add">Add ⭐</button>`;
    this.#archiveTooltip = `<button id="tooltip" value="coin" data-action="archive">Archive ❌</button>`;
    this.#restoreOrDeleteTooltip = `
      <button id="tooltip" value="coin" data-action="delete">Delete 🗑️</button>
      <button id="tooltip" value="coin" data-action="restore">Restore ♻️</button>
    `;
    this.#coin = entity.coin;
    this.#relative = entity.e.relatedTarget;
    TooltipDTO.#json = this.#toJSON();
  }

  #toJSON() {
    return {
      svg: this.#svg,
      add: this.#addTooltip,
      archive: this.#archiveTooltip,
      resOrDel: this.#restoreOrDeleteTooltip,
      coin: this.#coin,
      relative: this.#relative,
    };
  }
  static fromEntity(entity) {
    return new TooltipDTO(entity).#toJSON();
  }
}
