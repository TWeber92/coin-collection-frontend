import { AppController } from "./AppController.js";

export class CollectionController extends AppController {
  #collectionService;
  constructor(service) {
    super();
    this.#collectionService = service;
  }
  getCollectionsById(req, res) {
    return super.GET(req, res, () =>
      this.#collectionService.getCollectionsById(
        req.body.favoritesId,
        req.body.archiveId,
      ),
    );
  }
  getCoinFromArchiveCollection(req, res) {
    return super.GET(req, res, () =>
      this.#collectionService.getCoinFromArchiveCollection(req.body.name),
    );
  }
  async getUserSyncedCollection(req, res) {
    return super.GET(
      req,
      res,
      async () =>
        await this.#collectionService.getUserSyncedCollection(req.body.user),
    );
  }
  async postToFavoritesCollection(req, res) {
    return super.POST(
      req,
      res,
      async () =>
        await this.#collectionService.postToFavoritesCollection(
          req.body.coin.entity,
          req.body.user,
        ),
    );
  }
  async putFavoriteInArchiveCollection(req, res) {
    return super.PUT(
      req,
      res,
      async () =>
        await this.#collectionService.putFavoriteInArchiveCollection(
          req.body.coin.entity,
          req.body.user,
        ),
    );
  }
  async putArchivedInFavoritesCollection(req, res) {
    return super.PUT(
      req,
      res,
      async () =>
        await this.#collectionService.putArchivedInFavoritesCollection(
          req.body.coin.entity,
          req.body.user,
        ),
    );
  }
  async deleteArchivedFromCollection(req, res) {
    return super.DELETE(
      req,
      res,
      async () =>
        await this.#collectionService.deleteArchivedFromCollection(
          req.body.coin.entity,
          req.body.user,
        ),
    );
  }
  putAllFavoritesInCollection(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putAllFavoritesInCollection(req.body.usmap.coins),
    );
  }
  putCollectionOnOrOffPage(req, res) {
    super.PUT(req, res, () =>
      this.#collectionService.putCollectionOnOrOffPage(
        req.body.collection[req.body.selectedId],
        req.body.page,
      ),
    );
  }
  putFavoritesCollectionInEntity(req, res) {
    super.GET(req, res, () =>
      this.#collectionService.putFavoritesCollectionInEntity(),
    );
  }
  putCoinsInRespectiveDisplays(req, res) {
    return super.PUT(req, res, () =>
      this.#collectionService.putCoinsInRespectiveDisplays(
        req.body.user,
        req.body.usmap,
        req.body.favoritesId,
        req.body.archiveId,
      ),
    );
  }
  deleteLocalCollections(req, res) {
    super.DELETE(req, res, () =>
      this.#collectionService.deleteLocalCollections(
        req.body.favoritesId,
        req.body.archiveId,
      ),
    );
  }
  // deleteCollectionControls(req, res) {
  //   super.DELETE(req, res, () =>
  //     this.#collectionService.deleteCollectionControls(req.body),
  //   );
  // }
}
