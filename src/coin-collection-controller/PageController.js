import { AppController } from "./AppController.js";

export class PageController extends AppController {
  #pageService;
  constructor(service) {
    super();
    this.#pageService = service;
  }

  #putFavoritesOnPage(req, res) {
    super.PUT(req, res, () => this.#pageService.putFavoritesOnPage(req.body));
  }
  #putArchiveOnPage(req, res) {
    super.PUT(req, res, () => this.#pageService.putarchiveOnPage(req.body));
  }
}
