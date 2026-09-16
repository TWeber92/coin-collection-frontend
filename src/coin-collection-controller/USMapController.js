import { AppController } from "./AppController.js";

export class USMapController extends AppController {
  #usMapService;
  #putStatesBackInMap;
  constructor(service) {
    super();
    this.#usMapService = service;
  }
  getAllCoinsFromForeignObjects(req, res) {
    return super.GET(req, res, () =>
      this.#usMapService.getAllCoinsFromForeignObjects(),
    );
  }
  getCarouselPathsByIndex(req, res) {
    return super.GET(req, res, () =>
      this.#usMapService.getCarouselPathsByIndex(),
    );
  }
  putCoinInForeignObj(req, res) {
    return super.POST(req, res, () =>
      this.#usMapService.putCoinInForeignObj(req.body),
    );
  }
  postAllSvgPaths(req, res) {
    super.POST(req, res, () => this.#usMapService.postAllSvgPaths());
  }
  async putCoinsBackInMap(req, res) {
    super.PUT(
      req,
      res,
      async () => await this.#usMapService.putCoinsBackInMap(req.body),
    );
  }
  putStatesBackInMap(req, res) {
    super.PUT(req, res, () => this.#usMapService.putStatesBackInMap());
  }
  putPathBack(req, res) {
    return super.PUT(req, res, () => this.#usMapService.putPathBack(req.body));
  }
  putPathLast(req, res) {
    super.PUT(req, res, () => this.#usMapService.putPathLast(req.body));
  }
  putFOBack(req, res) {
    super.PUT(req, res, () => this.#usMapService.putFOBack(req.body));
  }
  putFOLast(req, res) {
    super.PUT(req, res, () => this.#usMapService.putFOLast(req.body));
  }
  putMapOnOffDisplay(req, res) {
    super.PUT(req, res, () => this.#usMapService.putMapOnOffDisplay());
  }
}
