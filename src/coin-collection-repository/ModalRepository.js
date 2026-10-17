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
        { t, b, f, fm, ni, btn }, // dynamic concept..
      ) =>
        HtmlStore.from([fm, ni, btn, t, b, f].filter(Boolean).join("")).nodes,
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
  postEmailStageContext(entity) {
    super.POST(entity, ({ form, newEmail, button, id }) => {
      const [h, b, f] = this.#entity.children;
      h.firstChild.textContent = `${id} ${form.id}`.toUpperCase();
      form.append(newEmail, button);
      b.replaceChildren(form);
      f.replaceChildren();
      this.putModalOnDisplay({ h, b, f });
    });
  }
  postPinStageContext(entity) {
    super.POST(entity, ({ pin, button, msg }) => {
      const [b, f] = [...this.#entity.children].slice(1);
      const form = b.firstChild;
      form.id = pin.id;
      [...form.elements].forEach((el) => {
        el.type = "hidden";
        el.parentNode.hidden = true;
      });
      form.replaceChild(button, form.lastChild);
      button.before(pin);
      f.append(msg)
    });
  }
  postPasswordStageContext(entity) {
    super.POST(entity, ({ button, body }) => {
      const [b, f] = [...this.#entity.children].slice(1);
      const form = b.firstChild;
      form.id = body[0].id;
      [...form.elements].forEach((el) => {
        el.type = "hidden";
        el.parentNode.hidden = true;
      });
      body.pop();
      body.push(button);
      form.lastChild.replaceWith(...body);
      f.replaceChildren()
    });
  }
  putModalOnOffDisplay(){
    super.PUT(this.#entity, (m) => {
      m.hidden = !m.hidden;
      document.body.dataset.overlay = m.hidden ? "false" : "true"
    })
  }
}
