import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class ModalRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity;
  }
  #entity;

  getModalContext(context) {
    return super.GET(
      context,
      (
        { t, b, f, fm, ne }, // dynamic concept..
      ) => HtmlStore.from([fm, ne, t, b, f].filter(Boolean).join("")).nodes,
    );
  }
  postStateModalContext(entity) {
    super.POST(entity, ({ title, body, footer, coin }) => {
      coin.hidden = false;
      coin.dataset.location = this.#entity.className;
      const [h, b, f] = this.#entity.children;
      h.replaceChild(title, h.firstChild);
      b.replaceChildren(body, coin);
      f.replaceChildren(...footer);
      this.putModalOnDisplay({ h, b, f });
    });
  }
  postLoginModalContext(entity) {
    super.POST(entity, ({ form, title, body, footer }) => {
      const [h, b, f] = this.#entity.children;
      h.replaceChild(title, h.firstChild);
      form.append(...body);
      b.replaceChildren(form);
      f.replaceChildren(footer);
      this.putModalOnDisplay({ h, b, f });
    });
  }
  postSignUpModalContext(entity) {
    super.POST(entity, ({ form, newEmail, title, body, footer }) => {
      const [h, b, f] = this.#entity.children;
      h.replaceChild(title, h.firstChild);
      form.append(newEmail);
      form.append(...body);
      b.replaceChildren(form);
      f.replaceChildren(footer);
      this.putModalOnDisplay({ h, b, f });
    });
  }
  putModalContextInOverlay(modal) {
    super.PUT(modal, (m) => this.#entity.append(...HtmlStore.from(m).nodes));
  }
  putModalOnDisplay(entity) {
    super.PUT(entity, ({ h, b, f }) => {
      this.#entity.replaceChildren(h, b, f);
      this.#entity.hidden = false;
      document.body.dataset.overlay = "true";
    });
  }
}
