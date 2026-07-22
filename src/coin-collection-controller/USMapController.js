import { AppController } from "./AppController";

export class USMapController extends AppController {
  #usMapService;
  constructor(service) {
    super();
    this.#usMapService = service;
  }
  postCoinInForeignObj(req, res) {
    super.POST(req, res, () => {
      this.#usMapService.postCoinInForeignObj(req.body);
    });
  }
  putCoinBackInMap(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putCoinBackInMap(req.body);
    });
  }
  putStatesBackInMap(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putStatesBackInMap(req.body);
    });
  }
  putPathBack(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putPathBack(req.body);
    });
  }
  putPathLast(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putPathLast(req.body);
    });
  }
  putFOBack(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putFOBack(req.body);
    });
  }
  putFOLast(req, res) {
    super.PUT(req, res, () => {
      this.#usMapService.putFOLast(req.body);
    });
  }
}
