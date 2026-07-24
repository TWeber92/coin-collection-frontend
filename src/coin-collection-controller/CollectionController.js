import { AppController } from "./AppController";

export class CollectionController extends AppController {
  #collectionService;
  constructor(service) {
    super();
    this.#collectionService = service;
  }
  postFavoriteToCollection(req, res) {
    return super.POST(req, res, () => {
      const data = this.#collectionService.postFavoriteToCollection(req.body);
      return { data };
    });
  }
  putFavoriteInArchiveCollection(req, res) {
    return super.PUT(req, res, () => {
      this.#collectionService.putFavoriteInArchiveCollection(req.body);
      return { data };
    });
  }
  putArchivedInFavoriteCollection(req, res) {
    return super.PUT(req, res, () => {
      this.#collectionService.putArchivedInFavoriteCollection(req.body);
      return { data };
    });
  }
  deleteArchivedFromUserCollection(req, res) {
    return super.DELETE(req, res, () => {
      this.#collectionService.deleteCoinFromUserCollection(req.body);
      return { data };
    });
  }
  updatecollectionLocation(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.updatecollectionLocation(req.body),
    );
  }
  putArchivedOnPage(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putArchivedOnPage(req.body),
    );
  }
  putFavoritesOnPage(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putFavoritesOnPage(req.body),
    );
  }
  deleteCollectionControls(req, res) {
    super.DELETE(req, res, () =>
      this.#collectionService.deleteCollectionControls(req.body),
    );
  }
}
