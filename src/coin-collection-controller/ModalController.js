import { AppController } from "./AppController.js";

export class ModalController extends AppController {
  #modalService;

  constructor(service) {
    super();
    this.#modalService = service;
  }

  postStateModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postStateModalContext(req.body),
    );
  }
  postLoginModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postLoginModalContext(req.body),
    );
  }
  postSignUpModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postSignUpModalContext(req.body),
    );
  }
}
