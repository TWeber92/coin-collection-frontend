import { AppController } from "./AppController";
export class CarouselController extends AppController {
  #carouselService;

  constructor(service) {
    super();
    this.#carouselService = service;
  }
  #postNewRandomIndex(req, res) {
    super.POST(req, res, () => this.#carouselService.postNewRandomIndex());
  }
  #putSlidesInPosition(req, res) {
    super.PUT(req, res, () =>
      this.#carouselService.putSlidesInPosition(req.body),
    );
  }
  #updatePrevIndex(req, res) {
    super.PUT(req, res, () => this.#carouselService.updatePrevIndex());
  }
  #updateNextIndex(req, res) {
    super.PUT(req, res, () => this.#carouselService.updateNextIndex());
  }
}
