import { AppController } from "./AppController.js";

export class HeaderController extends AppController {
  #headerService;

  constructor(service) {
    super();
    this.#headerService = service;
  }
  // putContextInHeader(req, res) {
  //   super.PUT(req, res, () => this.#headerService.putContextInHeader());
  // }
  putNewCountInBadge(req, res) {
    super.PUT(req, res, () => this.#headerService.putNewCountInBadge(req.body));
  }
  putNewIconInHeader(req, res) {
    super.PUT(req, res, () => this.#headerService.putNewIconInHeader(req.body));
  }
  putMenuNavOnOffDisplay(req, res) {
    super.PUT(req, res, () =>
      this.#headerService.putMenuNavOnOffDisplay(req.body),
    );
  }
}
