export class HeaderDTO {
  #favorites;
  #archive;
  #headerContext;
  #badgeId;
  constructor(entity) {
    this.#headerContext = `
      <h1>🪙 Coin Collection</h1>
      <menu id="menu" class="nav-desktop" aria-label="Main navigation">
        <button id="favorites" class="nav-item">
          ⭐ Favorites
          <span id="badge" class="favorites-badge">0</span>
        </button>
        <button id="archived" data-location="archived" class="nav-item">
          📦 Archived
          <span id="badge" data-badge="archived" class="archived-badge">0</span>
        </button>
      </menu>
      <button id="hamburger" class="menu-hamburger" data-option="hamburger" aria-label="Toggle menu">
        ☰
      </button>
      <nav id="nav-mobile" class="nav-mobile" hidden=true aria-label="Mobile navigation">
        <button id="favorites" data-location="menu" class="nav-item">
          ⭐ Favorites
          <span id="badge" data-badge="favorites" class="favorites-badge">0</span>
        </button>
        <button id="archived" data-location="menu" class="nav-item">
          📦 Archived
          <span id="badge" data-badge="archived" class="archived-badge">0</span>
        </button>
      </nav>
    `;
    this.badgeId = this.#headerContext.match(/badge/)[0];
    this.#favorites = entity.collection?.favorites.count;
    this.#archive = entity.collection?.archive.count;
  }

  get collection() {
    return {
      favorites: { count: this.#favorites },
      archive: { count: this.#archive },
    };
  }

  #toJSON() {
    return {
      context: this.#headerContext,
      id: this.#badgeId,
      favorites: this.#favorites,
      archive: this.#archive,
    };
  }
  static fromEntity(entity) {
    return new HeaderDTO(entity).#toJSON();
  }
}
