import { AppController } from "./AppController.js";

export class USMapController extends AppController {
  #usMapService;
  constructor(service) {
    super();
    this.#usMapService = service;
  }
  getUSMapSvgText(req, res) {
    return super.GET(req, res, () => this.#usMapService.getUSMapSvgText());
  }
  getAndSerializePaths(req, res) {
    return super.GET(req, res, () => this.#usMapService.getAndSerializePaths());
  }
  putMapOnDisplay(req, res) {
    super.PUT(req, res, () => this.#usMapService.putMapOnDisplay(req.body.svg));
  }
  getAllCoinsFromForeignObjects(req, res) {
    return super.GET(req, res, () =>
      this.#usMapService.getAllCoinsFromForeignObjects(req.body.foTag),
    );
  }
  getCarouselPathsByIndex(req, res) {
    return super.GET(req, res, () =>
      this.#usMapService.getCarouselPathsByIndex(req.body.carousel.index),
    );
  }
  putCoinInForeignObj(req, res) {
    return super.POST(req, res, () =>
      this.#usMapService.putCoinInForeignObj(req.body.coin.entity),
    );
  }
  postAllSvgPaths(req, res) {
    super.POST(req, res, () => this.#usMapService.postAllSvgPaths());
  }
  async putCoinsBackInMap(req, res) {
    super.PUT(
      req,
      res,
      async () =>
        await this.#usMapService.putCoinsBackInMap(
          req.body.collection.favorites,
        ),
    );
  }
  putStatesBackInMap(req, res) {
    super.PUT(req, res, () => this.#usMapService.putStatesBackInMap());
  }
  putPathBack(req, res) {
    return super.PUT(req, res, () =>
      this.#usMapService.putPathBack(req.body.path),
    );
  }
  putPathLast(req, res) {
    super.PUT(req, res, () => this.#usMapService.putPathLast(req.body.path));
  }
  putFOBack(req, res) {
    super.PUT(req, res, () => this.#usMapService.putFOBack(req.body.fo));
  }
  putFOLast(req, res) {
    super.PUT(req, res, () => this.#usMapService.putFOLast(req.body.fo));
  }
  putMapOnOffDisplay(req, res) {
    super.PUT(req, res, () => this.#usMapService.putMapOnOffDisplay());
  }
}
