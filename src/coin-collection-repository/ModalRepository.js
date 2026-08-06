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
    return super.GET(value, (v) => v.node.querySelector(v.collectedId));
  }
  postStateModal(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  postLoginModal(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  postSignUpModal(value) {
    super.POST(value, (c) => this.entity.replaceChildren(c));
  }
  putCoinAfterCollected(value) {
    super.POST(value, (v) => v.collected.after(v.coin));
  }
  putModalOnDisplay() {
    this.entity.hidden = false;
  }
}
