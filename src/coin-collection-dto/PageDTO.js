export class PageDTO {
  #template;
  #containerId;
  #collection;
  constructor(entity) {
    entity = { ...this.#toJSON(), entity };
    this.#template = `
      <div id="page" class="page-collections">
        <div class="page-header">
          <h2>📚 My Collection</h2>
          <button id="page" data-action="close" type="button">✕</button>
        </div>
        <div class="page-body">
          <div data-collection="favorites">
          </div>
          <div data-collection="archive">
          </div>
        </div>
      </div>
    `;
    this.#containerId = entity.id;
    this.#collection = entity.collection;
  }

  #toJSON() {
    return {
      template: this.#template,
      id: this.#containerId,
      collection: this.#collection,
    };
  }
  static fromEntity(entity) {
    return new PageDTO(entity).#toJSON();
  }
}
