import { Modal } from "../coin-collection-entity/Modal.js";
import { ModalView } from "../coin-collection-view/ModalView.js";

export class ModalService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;

  putModalContextInOverlay() {
    const { modal } = ModalView.from({});
    this.#repo.putModalContextInOverlay(modal);
  }

  postStateModalContext(coin, name, year, favorites) {
    const { title, body, footer } = ModalView.from({
      coin,
      name,
      year,
      favorites,
    }).stateModal;
    const nodes = this.#repo.getModalContext({
      t: title,
      b: body,
      f: footer,
    });
    const entity = Modal.from({
      title: nodes[0],
      body: nodes[1],
      footer: [...nodes].slice(2),
      coin: coin,
    });
    this.#repo.postStateModalContext(entity.to());
  }
  postLoginModalContext(name) {
    const { loginModal, form } = ModalView.from({ name });
    const { title, body, footer } = loginModal;
    const nodes = this.#repo.getModalContext({
      fm: form,
      t: title,
      b: body,
      f: footer,
    });
    const entity = Modal.from({
      form: nodes[0],
      title: nodes[1],
      body: [...nodes].slice(2, 5),
      footer: nodes[5],
    });
    this.#repo.postLoginModalContext(entity.to());
  }
  postSignUpModalContext(name) {
    const { signupModal, form, newEmail } = ModalView.from({
      name,
    });
    const { title, body, footer } = signupModal;
    const nodes = this.#repo.getModalContext({
      ni: newEmail,
      fm: form,
      t: title,
      b: body,
      f: footer,
    });
    const entity = Modal.from({
      form: nodes[0],
      newEmail: nodes[1],
      title: nodes[2],
      body: [...nodes].slice(3, 6),
      footer: nodes[6],
    });
    this.#repo.postSignUpModalContext(entity.to());
  }
  postEmailStageContext(id, name) {
    console.log(name);

    const { button, form, newEmail } = ModalView.from({
      name,
    });
    const nodes = this.#repo.getModalContext({
      ni: newEmail,
      fm: form,
      btn: button,
    });
    console.log();

    const entity = Modal.from({
      form: nodes[0],
      newEmail: nodes[1],
      button: nodes[2],
    });
    this.#repo.postEmailStageContext({ ...entity.to(), id });
  }
  postPinStageContext(name, message) {
    const { button, pin } = ModalView.from({
      name,
    });
    const nodes = this.#repo.getModalContext({
      ni: pin,
      btn: button,
    });
    const entity = Modal.from({
      pin: nodes[0],
      button: nodes[1],
    });
    this.#repo.postPinStageContext({ ...entity.to(), msg: message });
  }
  postResetStageContext(name) {
    const { button, signupModal } = ModalView.from({
      name,
    });
    const { body } = signupModal;
    const nodes = this.#repo.getModalContext({
      btn: button,
      b: body,
    });
    const entity = Modal.from({
      button: nodes[0],
      body: [...nodes].slice(1),
    });
    this.#repo.postPasswordStageContext(entity.to());
  }
  deleteModalFromDisplay(){
    this.#repo.putModalOnOffDisplay()
  }
}
