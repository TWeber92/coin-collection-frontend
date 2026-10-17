import { Coin } from "./Coin.js";

export class Modal {
  #title
  #body
  #footer
  #coin
  #form
  #newEmail
  #button
  #pin
  constructor(data) {
    this.#title = data.title;
    this.#body = data.body
    this.#footer = data.footer
    this.#coin = data.coin
    this.#form = data.form;
    this.#newEmail = data.newEmail
    this.#button = data.button
    this.#pin = data.pin
  }

  to() {
    return {
      title: this.#title,
      body: this.#body,
      footer: this.#footer,
      coin: this.#coin,
      form: this.#form,
      newEmail: this.#newEmail,
      button: this.#button,
      pin: this.#pin
    };
  }
  static from(data) {
    return new Modal(data);
  }
}
