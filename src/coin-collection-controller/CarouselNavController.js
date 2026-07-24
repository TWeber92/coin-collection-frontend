import { AppController } from "./AppController";
export class CarouselNavController extends AppController {
  #carouselService;

  constructor(service) {
    super();
    this.#carouselService = service;
  }
  getNavIndex(req, res) {
    return super.GET(req, res, () => {
      const data = this.#carouselService.getNavIndex(req.body);
      return { data };
    });
  }
}
