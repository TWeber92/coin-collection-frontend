export class HeaderDTO {
  static #json = {};
  #favorites;
  #archive;
  #headerContext;
  #headerBtns;
  #badgeId;
  #menuBtnId;
  #nav;
  constructor(entity) {
    entity = { ...HeaderDTO.#json, ...entity };
    this.#headerContext = `
      <h3>STATE QUARTERS</h3>
      <menu id="menu" class="nav-desktop" aria-label="Main navigation">
      </menu>
      <button id="hamburger" class="menu-hamburger" data-option="hamburger" aria-label="Toggle menu">
        ☰
      </button>
      <nav id="nav-menu" class="nav-mobile" hidden=true aria-label="Mobile navigation">
      </nav>
    `;
    this.#headerBtns = `
        <button id="login" data-nav-item class="nav-item">
          🔑 Login
        </button>
        <button id="favorites" data-nav-item class="nav-item">
          ⭐ Favorites
          <span id="badge" data-badge="favorites" class="favorites-badge">0</span>
        </button>
        <button id="archived" data-nav-item class="nav-item">
          📦 Archived
          <span id="badge" data-badge="archived" class="archived-badge">0</span>
        </button>`;
    this.#badgeId = entity.id;
    this.#menuBtnId = entity.menuId;
    this.#nav = entity.nav;
    this.#favorites = entity.collection?.favorites?.count;
    this.#archive = entity.collection?.archive?.count;
    HeaderDTO.#json = this.#toJSON();
  }

  get collection() {
    return {
      favorites: { count: this.#favorites },
      archive: { count: this.#archive },
    };
  }

  #toJSON() {
    return {
      template: this.#headerContext,
      bid: this.#badgeId,
      mbi: this.#menuBtnId,
      nav: this.#nav,
      favorites: this.#favorites,
      archive: this.#archive,
      collections: this.collection,
      buttons: this.#headerBtns,
    };
  }
  static fromEntity(entity) {
    return new HeaderDTO(entity).#toJSON();
  }
}
