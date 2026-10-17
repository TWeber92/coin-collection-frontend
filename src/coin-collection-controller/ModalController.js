import { AppController } from "./AppController.js";

export class ModalController extends AppController {
  #modalService;

  constructor(service) {
    super();
    this.#modalService = service;
  }

  postStateModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postStateModalContext(
        req.body.coin.entity,
        req.body.coin.name,
        req.body.coin.year,
        req.body.user.collection.favorites,
      ),
    );
  }
  postLoginModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postLoginModalContext(req.body.id),
    );
  }
  postSignUpModalContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postSignUpModalContext(req.body.id),
    );
  }
  postEmailStageContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postEmailStageContext(req.body.id, req.body.name),
    );
  }
  postPinStageContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postPinStageContext(req.body.name, req.body.message),
    );
  }
  postResetStageContext(req, res) {
    super.POST(req, res, () =>
      this.#modalService.postResetStageContext(req.body.name),
    );
  }

  putModalContextInOverlay(req, res) {
    super.PUT(req, res, () => this.#modalService.putModalContextInOverlay());
  }

  deleteModalFromDisplay(req, res) {
    super.DELETE(req, res, () => this.#modalService.deleteModalFromDisplay());
  }
}
