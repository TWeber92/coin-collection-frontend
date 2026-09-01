import { AppController } from "./AppController.js";

export class PageController extends AppController {
  #pageService;
  constructor(service) {
    super();
    this.#pageService = service;
  }

  putFavoritesOnPage(req, res) {
    return super.PUT(req, res, () =>
      this.#pageService.putFavoritesOnPage(req.body),
    );
  }
  putArchiveOnPage(req, res) {
    return super.PUT(req, res, () =>
      this.#pageService.putArchiveOnPage(req.body),
    );
  }
}
