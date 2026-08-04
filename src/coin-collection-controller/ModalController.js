import { AppController } from "./AppController";

export class ModalController extends AppController {
  #modalService;

  constructor(service) {
    super();
    this.#modalService = service;
  }

  #postStateModal(req, res) {
    super.POST(req, res, () => this.#modalService.postStateModal(req.body));
  }
  #postLoginModal(req, res) {
    super.POST(req, res, () => this.#modalService.postLoginModal(req.body));
  }
  #postSignUpModal(req, res) {
    super.POST(req, res, () => this.#modalService.postSignUpModal(req.body));
  }
}
