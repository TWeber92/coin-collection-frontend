export class PageDTO {
  static #json = {};
  #template;
  #containerId;
  #collectionCoins;
  #collectionPage;
  #collection;
  constructor(entity) {
    entity = { ...PageDTO.#json, ...entity };
    this.#template = `
        <div class="page-header"></div>
        <div class="page-body"></div>
    `;
    this.#collectionPage = {
      header: `<h2>📚 My Collection</h2>
               <button id="close" data-action="close" type="button">✕</button>`,
      body: `<div id="favorites"><div class="row"><h3>⭐ FAVORITES</h3><button id="favorites">︿</button></div></div>
              <div id="archive"><div class="row"><h3>📦 ARCHIVE</h3><button id="archive">︿</button></div></div>`,
    };
    this.#containerId = entity.collectionId;
    this.#collectionCoins = entity.collection;
    this.#collection = entity.collection;
    PageDTO.#json = this.#toJSON();
  }

  #toJSON() {
    return {
      template: this.#template,
      id: this.#containerId,
      coins: this.#collectionCoins,
      collections: this.#collectionPage,
      collection: this.#collection,
    };
  }
  static fromEntity(entity) {
    return new PageDTO(entity).#toJSON();
  }
}
