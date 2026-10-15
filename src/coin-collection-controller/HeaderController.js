import { AppController } from "./AppController.js";

export class HeaderController extends AppController {
  #headerService;

  constructor(service) {
    super();
    this.#headerService = service;
  }
  getHeaderContext(req, res) {
    return super.GET(req, res, () => this.#headerService.getHeaderContext());
  }
  putNewCountInBadge(req, res) {
    return super.PUT(req, res, () =>
      this.#headerService.putNewCountInBadge(req.body.header.collection),
    );
  }
  putNewIconInHeader(req, res) {
    super.PUT(req, res, () =>
      this.#headerService.putNewIconInHeader(req.body.menuBtnId),
    );
  }
  putMenuNavOnOffDisplay(req, res) {
    super.PUT(req, res, () =>
      this.#headerService.putMenuNavOnOffDisplay(req.body.menuBtn),
    );
  }
  putContextInHeader(req, res) {
    super.PUT(req, res, () =>
      this.#headerService.putContextInHeader(req.body.user),
    );
  }
  deleteAboutHeaderButton(req, res) {
    super.DELETE(req, res, () =>
      this.#headerService.deleteAboutHeaderButton(req.body.user),
    );
  }
}
