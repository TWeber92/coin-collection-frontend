import { EmailCopyNotice } from "../coin-collection-exception/CoinCollectionError.js";
import { AppController } from "./AppController.js";

export class PageController extends AppController {
  #pageService;
  constructor(service) {
    super();
    this.#pageService = service;
  }

  async getEmailNotice(req, res){
    return super.GET(req, res, async () => {
      await navigator.clipboard.writeText(req.body.button.value)
      return new EmailCopyNotice("Email copied to clipboard")
    })
  }

  putFavoritesOnPage(req, res) {
    return super.PUT(req, res, () =>
      this.#pageService.putFavoritesOnPage(
        req.body.collection.favorites,
        req.body.collection.archive,
        req.body.favoritesId,
        req.body.archiveId,
      ),
    );
  }
  putArchiveOnPage(req, res) {
    return super.PUT(req, res, () =>
      this.#pageService.putArchiveOnPage(
        req.body.collection.favorites,
        req.body.collection.archive,
        req.body.favoritesId,
        req.body.archiveId,
      ),
    );
  }
  putAboutOnPage(req, res) {
    super.PUT(req, res, () => this.#pageService.postAboutPage(req.body.user));
  }
  putArchiveInNewPosition(req, res) {
    super.PUT(req, res, () =>
      this.#pageService.putArchiveInNewPosition(
        req.body.button,
        req.body.collection.archive,
      ),
    );
  }
  putFooterContentsOnOffPage(req, res) {
    super.PUT(req, res, () =>
      this.#pageService.putFooterContentsOnOffPage(
        req.body.button.id,
        req.body.collection.archive,
        req.body.header.collection.archive,
      ),
    );
  }
  deletePageFromDisplay(req, res){
    super.DELETE(req, res, () => this.#pageService.deletePageFromDisplay())
  }
}
