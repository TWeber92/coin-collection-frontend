import { CarouselDTO } from "../coin-collection-dto/CarouselDTO.js";
import { Carousel } from "../coin-collection-entity/Carousel.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";
import { CarouselView } from "../coin-collection-view/CarouselView.js";

export class CarouselService {
  constructor(repo) {
    this.#repo = repo;
  }

  #repo;
  #pathCount;

  getRandomIndex(pathCount) {
    this.#pathCount = pathCount
    const calc = (l) => Math.floor(Math.random() * l);
    return CarouselDTO.from({ index: calc(pathCount) });
  }
  putCarouselAssemblyinNav(index) {
    this.#repo.index = index;
    const carousel = CarouselView.from({}).carousel;
    const { active, next, prev } = CarouselView.from({});
    const navigation = this.#repo.getCarouselPartsWithHtml(carousel);
    const slides = this.#repo.getCarouselPartsWithHtml(prev + active + next);
    const entity = Carousel.from({
      navigation,
      prev: slides[0],
      active: slides[1],
      next: slides[2],
    });
    this.#repo.getStateCarouselLayout({
      id: "state-carousel",
      className: "state-carousel",
    });
    this.#repo.putCarouselNavTogether(entity.to());
  }
  postPreviousStateSlide() {
    const calc = (l, i) => (i - 1 + l) % l;
    this.#repo.index = calc(this.#pathCount, this.#repo.index);
    return CarouselDTO.from({ index: this.#repo.index });
  }
  postNextStateSlide() {
    const calc = (l, i) => (i + 1) % l;
    this.#repo.index = calc(this.#pathCount, this.#repo.index);
    return CarouselDTO.from({ index: this.#repo.index });
  }
  async putSlidesInPosition(navPaths) {
    const [prev, active, next] = this.#repo.getSlidesFromCarousel();
    const entity = Carousel.from({ prev, active, next }).to();
    for (const [key, slide] of Object.entries(entity.slides)) {
      const path = navPaths[key].path;
      const name = path.dataset.name;
      const html = CarouselView.from({ name });
      const span = this.#repo.getCarouselPartsWithHtml(html.span);
      const container = this.#repo.getSlideContainer(slide);
      container.dataset.name = name;
      const { geo } = await GeoUtility.getGeometryForSlide(path);
      const svg = this.#repo.getSvgForSlidePath({
        ...geo,
        id: path.id,
        data: { name },
      });
      this.#repo.putSlideTogether({ svg, p: path, cs: container, s: span[0] });
    }
  }
  putCarouselOnOffDisplay() {
    this.#repo.putCarouselOnOffDisplay();
  }
}
