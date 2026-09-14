export class PageDTO {
  static #json = {};
  #template;
  #containerId;
  #collectionCoins;
  #collectionPage;
  #collection;
  #button;
  #direction;
  #phCe;
  #phNotCh;
  #chCeOrNotCh;
  constructor(entity) {
    entity = { ...PageDTO.#json, ...entity };
    this.#html;
    this.#containerId = entity.collectionId;
    this.#collectionCoins = entity.collection;
    this.#collection = entity.collection;
    this.#button = entity.button;
    this.#direction = entity.button?.dataset.dir;
    this.#phCe = entity.pageHidden && entity.collectionExists;
    this.#phNotCh = entity.pageHidden && !entity.collectionHidden;
    this.#chCeOrNotCh =
      (entity.collectionHidden && entity.collectionExists) ||
      !entity.collectionHidden;
    PageDTO.#json = this.#toJSON();
  }

  get #html() {
    this.#template = `
        <div id="header" class="page-header"></div>
        <div id="body" class="page-body"></div>
        <div id="footer" class="page-footer"></div>`;
    this.#collectionPage = {
      header: `<h2>📚 My Collection</h2>
               <button id="close" data-action="close" type="button">✕</button>`,
      body: `<div id="favorites"><div class="row"><h3>⭐ FAVORITES</h3><button id="favorites">︿</button></div></div>
              <div id="archive"><div class="row"><h3>📦 ARCHIVE</h3><button id="archive">︿</button></div></div>`,
      footer: `<button id="scrollable" name="archive" data-dir="75" class="archive-scroll" hidden>〈</button>
                <button id="scrollable" name="archive" data-dir="-75" class="archive-scroll" hidden>〉</button>`,
    };
  }

  #toJSON() {
    return {
      template: this.#template,
      id: this.#containerId,
      coins: this.#collectionCoins,
      collections: this.#collectionPage,
      collection: this.#collection,
      button: this.#button,
      direction: this.#direction,
      phCe: this.#phCe,
      phNotCh: this.#phNotCh,
      chCeOrNotCh: this.#chCeOrNotCh,
    };
  }
  static fromEntity(entity) {
    return new PageDTO(entity).#toJSON();
  }
}
