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
  putArchiveInNewPosition(req, res) {
    super.PUT(req, res, () =>
      this.#pageService.putArchiveInNewPosition(req.body),
    );
  }
  putFooterContentsOnOffDisplay(req, res) {
    super.PUT(req, res, () =>
      this.#pageService.putFooterContentsOnOffDisplay(req.body),
    );
  }
}
