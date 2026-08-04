import { DocumentStore } from "../DocumentStore";
import { DocumentClient } from "./DocumentClient";

export class ModalRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getModalElement(props) {
    return DocumentStore.createDivElement(props).appendTo(document.body);
  }
  getContainerFromEntityById(value) {
    return super.GET(value, (id) => this.entity.querySelector(id));
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
