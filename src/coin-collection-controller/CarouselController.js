import { AppController } from "./AppController.js";
export class CarouselController extends AppController {
  #carouselService;

  constructor(service) {
    super();
    this.#carouselService = service;
  }
  // postNewRandomIndex(req, res) {
  //   super.POST(req, res, () => this.#carouselService.postNewRandomIndex());
  // }
  getRandomIndex(req, res) {
    return super.GET(req, res, () =>
      this.#carouselService.getRandomIndex(req.body.count),
    );
  }
  putCarouselAssemblyinNav(req, res) {
    super.PUT(req, res, () =>
      this.#carouselService.putCarouselAssemblyinNav(req.body.carousel.index),
    );
  }
  postPreviousStateSlide(req, res) {
    return super.POST(req, res, () =>
      this.#carouselService.postPreviousStateSlide(),
    );
  }
  postNextStateSlide(req, res) {
    return super.POST(req, res, () =>
      this.#carouselService.postNextStateSlide(),
    );
  }
  putCarouselOnOffDisplay(req, res) {
    super.PUT(req, res, () => this.#carouselService.putCarouselOnOffDisplay());
  }
  putSlidesInPosition(req, res) {
    super.PUT(req, res, () =>
      this.#carouselService.putSlidesInPosition(req.body.usmap.navPaths),
    );
  }
}
