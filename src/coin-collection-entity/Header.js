export class Header {
  #title;
  #menu;
  #hamburger;
  #mobile;
  #buttons;
  #header;
  #favorites;
  #archive;

  constructor(data) {
    this.#title = data.title;
    this.#menu = data.menu;
    this.#hamburger = data.hamburger;
    this.#mobile = data.mobile;
    this.#header = data.header;
    this.#favorites = data.favorites;
    this.#archive = data.archive;
    this.#buttons = {
      about: data.buttons[0],
      login: data.buttons[1],
      favorites: data.buttons[2],
      archive: data.buttons[3],
    };
  }

  to() {
    return {
      title: this.#title,
      menu: this.#menu,
      hamburger: this.#hamburger,
      mobile: this.#mobile,
      buttons: this.#buttons,
      header: this.#header,
      collection: {
        favorites: this.#favorites,
        archive: this.#archive,
      },
      buttons: this.#buttons,
    };
  }
  static from(data) {
    return new Header(data);
  }
}
