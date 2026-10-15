export class HeaderDTO {
  #menu;
  #hamburger;
  #mobile;
  #buttons;
  #header;
  #favorites;
  #archive;
  constructor(data) {
    this.#menu = data.menu;
    this.#hamburger = data.hamburger;
    this.#mobile = data.mobile;
    this.#buttons = data.buttons;
    this.#header = data.header;
    this.#favorites = data.favorites?.length;
    this.#archive = data.archive?.length;
  }

  to() {
    return {
      menu: this.#menu,
      hamburger: this.#hamburger,
      mobile: this.#mobile,
      buttons: this.#buttons,
      header: this.#header,
      collection: {
        favorites: this.#favorites,
        archive: this.#archive,
      },
    };
  }
  static from(data) {
    return new HeaderDTO(data);
  }
}
