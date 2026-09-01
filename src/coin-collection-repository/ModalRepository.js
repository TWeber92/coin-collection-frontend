import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class ModalRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getModalElement(props) {
    return document.body.appendChild(
      DocumentStore.createDivElement(props).node,
    );
  }
  getCollectedFromStateModal(value) {
    return super.GET(value, (e) => e.body.querySelector(e.collectedId));
  }
  postStateModalContext(value) {
    super.POST(value, (v) => {
      const [header, body, footer] = this.entity.children;
      header.replaceChild(v.t, header.querySelector("h2"));
      body.replaceChildren(v.b, v.coin);
      footer.replaceChildren(...v.f);
    });
  }
  postLoginModalContext(value) {
    this.#postAuthenticationModal(value);
  }
  postSignUpModalContext(value) {
    this.#postAuthenticationModal(value);
  }
  #postAuthenticationModal(value) {
    super.POST(value, (v) => {
      const [header, body, footer] = this.entity.children;
      header.replaceChild(v.t, header.querySelector("h2"));
      body.replaceChildren(v.b);
      footer.replaceChildren(v.f);
    });
  }
  putCoinAfterCollected(value) {
    super.POST(value, (v) => v.collected.after(v.coin));
  }
  putModalOnDisplay() {
    this.entity.hidden = false;
    document.body.dataset.overlay = "true";
  }
  putModalContextInOverlay(value) {
    super.PUT(value, (n) => this.entity.append(...n));
  }
}
