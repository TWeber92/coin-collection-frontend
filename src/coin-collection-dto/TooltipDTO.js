export class TooltipDTO {
  #addTooltip;
  #archiveTooltip;
  #restoreOrDeleteTooltip;
  constructor(entity) {
    this.#addTooltip = `<button id="tooltip" data-action="add">Add ${entity.id}?</button>`;
    this.#archiveTooltip = `<button id="tooltip" data-action="archive">Archive ${entity.id}?</button>`;
    this.#restoreDeleteTooltip = `
      <button id="tooltip" data-action="restore">Restore ${entity.id}</button>
      <button id="tooltip" data-action="delete">Delete ${entity.id}?</button>
    `;
  }

  #toJSON() {
    return {
      add: this.#addTooltip,
      archive: this.#archiveTooltip,
      resOrDel: this.#restoreOrDeleteTooltip,
    };
  }
  static fromEntity(entity) {
    return new TooltipDTO(entity).#toJSON();
  }
}
