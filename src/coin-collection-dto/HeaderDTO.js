export class HeaderDTO {
  static #json = {};
  #favorites;
  #archive;
  #headerContext;
  #headerBtns;
  #badgeId;
  #archiveId;
  #favoritesId;
  #menuBtnId;
  #nav;
  constructor(entity) {
    entity = { ...HeaderDTO.#json, ...entity };
    this.#html;
    this.#badgeId = `#${entity.badgeId}`;
    this.#menuBtnId = `#${entity.menuId}`;
    this.#archiveId = entity.archiveId;
    this.#favoritesId = entity.favoritesId;
    this.#nav = entity.nav;
    this.#favorites = entity.collection?.favorites?.count;
    this.#archive = entity.collection?.archive?.count;
    HeaderDTO.#json = this.#toJSON();
  }

  get #collection() {
    return {
      favorites: { count: this.#favorites },
      archive: { count: this.#archive },
    };
  }

  get #html() {
    this.#headerContext = `
      <h3>STATE QUARTERS</h3>
      <menu id="menu" class="nav-desktop" aria-label="Main navigation">
      </menu>
      <button id="hamburger" class="menu-hamburger" data-option="hamburger" aria-label="Toggle menu">
        ☰
      </button>
      <nav id="nav-menu" class="nav-mobile" hidden aria-label="Mobile navigation"></nav>
    `;
    this.#headerBtns = `
        <button id="login" data-nav-item class="nav-item">
          🔑Login
        </button>
        <button id="favorites" data-nav-item class="nav-item">
          ⭐Favorites
          <span id="badge" data-badge="favorites" class="favorites-badge">0</span>
        </button>
        <button id="archive" data-nav-item class="nav-item">
          📦Archive
          <span id="badge" data-badge="archive" class="archive-badge">0</span>
        </button>`;
  }

  #toJSON() {
    return {
      template: this.#headerContext,
      bid: this.#badgeId,
      mbi: this.#menuBtnId,
      archiveId: this.#archiveId,
      favoritesId: this.#favoritesId,
      nav: this.#nav,
      favorites: this.#favorites,
      archive: this.#archive,
      collection: this.#collection,
      buttons: this.#headerBtns,
    };
  }
  static fromEntity(entity) {
    return new HeaderDTO(entity).#toJSON();
  }
}
