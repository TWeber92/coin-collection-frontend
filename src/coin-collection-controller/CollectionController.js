import { AppController } from "./AppController";

export class CollectionController extends AppController {
  #collectionService;
  constructor(service) {
    super();
    this.#collectionService = service;
  }
  postFavoriteToCollection(req, res) {
    super.POST(req, res, () => {
      this.#collectionService.postFavoriteToCollection(req.body);
    });
  }
  putFavoriteInArchiveCollection(req, res) {
    super.PUT(req, res, () => {
      this.#collectionService.putFavoriteInArchiveCollection(req.body);
    });
  }
  putArchivedInFavoriteCollection(req, res) {
    super.PUT(req, res, () => {
      this.#collectionService.putArchivedInFavoriteCollection(req.body);
    });
  }
  deleteArchivedFromUserCollection(req, res) {
    super.DELETE(req, res, () => {
      this.#collectionService.deleteCoinFromUserCollection(req.body);
    });
  }
  updatecollectionLocation(req, res) {
    super.PUT(req, res, () => {
      this.#collectionService.updatecollectionLocation(req.body);
    });
  }
  deleteCollectionControls(req, res) {
    super.DELETE(req, res, () => {
      this.#collectionService.deleteCollectionControls(req.body);
    });
  }
  putArchivedOnPage(req, res) {
    super.PUT(req, res, () => {
      this.#collectionService.putArchivedOnPage(req.body);
    });
  }
  putFavoritesOnPage(req, res) {
    super.PUT(req, res, () => {
      this.#collectionService.putFavoritesOnPage(req.body);
    });
  }
}
