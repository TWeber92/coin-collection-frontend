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
  async postToFavoritesCollection(req, res) {
    super.POST(req, res, async () => {
      await this.#collectionService.postToFavoritesCollection(req.body);
    });
  }
  async putFavoriteInArchiveCollection(req, res) {
    super.PUT(req, res, async () => {
      await this.#collectionService.putFavoriteInArchiveCollection(req.body);
    });
  }
  async putArchivedInFavoriteCollection(req, res) {
    super.PUT(req, res, async () => {
      await this.#collectionService.putArchivedInFavoriteCollection(req.body);
    });
  }
  async deleteArchivedFromCollection(req, res) {
    super.DELETE(req, res, async () => {
      await this.#collectionService.deleteArchivedFromCollection(req.body);
    });
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
