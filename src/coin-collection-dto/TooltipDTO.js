export class TooltipDTO {
  #addTooltip;
  #archiveTooltip;
  #restoreOrDeleteTooltip;
  constructor(id) {
    this.#addTooltip = `<button id="tooltip" data-action="add">Add ${id}?</button>`;
    this.#archiveTooltip = `<button id="tooltip" data-action="archive">Archive ${id}?</button>`;
    this.#restoreDeleteTooltip = `
      <button id="tooltip" data-action="restore">Restore</button>
      <button id="tooltip" data-action="delete">Delete ${id}?</button>
    `;
  }

  #toJSON() {
    return {
      add: this.#addTooltip,
      archive: this.#archiveTooltip,
      resOrDel: this.#restoreOrDeleteTooltip,
    };
  }
  static toEntity(id) {
    return new TooltipDTO(id).#toJSON();
  }
}
