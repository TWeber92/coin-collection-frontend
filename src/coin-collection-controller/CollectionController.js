import { AppController } from "./AppController.js";

export class CollectionController extends AppController {
  #collectionService;
  constructor(service) {
    super();
    this.#collectionService = service;
  }
  getCollectionById(req, res) {
    return super.GET(req, res, () =>
      this.#collectionService.getCollectionById(req.body),
    );
  }
  getCoinFromArchiveCollection(req, res) {
    return super.GET(req, res, () =>
      this.#collectionService.getCoinFromArchiveCollection(req.body),
    );
  }
  async getUserSyncedCollection(req, res) {
    return super.GET(
      req,
      res,
      async () =>
        await this.#collectionService.getUserSyncedCollection(req.body),
    );
  }
  async getCollectedFavoriteNames(req, res) {
    return super.GET(req, res, () =>
      this.#collectionService.getCollectedFavoriteNames(req.body),
    );
  }
  async postToFavoritesCollection(req, res) {
    return super.POST(
      req,
      res,
      async () =>
        await this.#collectionService.postToFavoritesCollection(req.body),
    );
  }
  async putFavoriteInArchiveCollection(req, res) {
    return super.PUT(
      req,
      res,
      async () =>
        await this.#collectionService.putFavoriteInArchiveCollection(req.body),
    );
  }
  async putArchivedInFavoritesCollection(req, res) {
    return super.PUT(
      req,
      res,
      async () =>
        await this.#collectionService.putArchivedInFavoritesCollection(
          req.body,
        ),
    );
  }
  async deleteArchivedFromCollection(req, res) {
    return super.DELETE(
      req,
      res,
      async () =>
        await this.#collectionService.deleteArchivedFromCollection(req.body),
    );
  }
  putAllFavoritesInCollection(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putAllFavoritesInCollection(req.body),
    );
  }
  putCollectionOnOrOffDisplay(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putCollectionOnOrOffDisplay(req.body),
    );
  }
  // #deleteCollectionControls(req, res) {
  //   super.DELETE(req, res, () =>
  //     this.#collectionService.deleteCollectionControls(req.body),
  //   );
  // }
}
