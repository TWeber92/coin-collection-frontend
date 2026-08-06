import { CarouselDTO } from "../coin-collection-dto/CarouselDTO.js";
import { CarouselEntity } from "../coin-collection-entity/CarouselEntity.js";
import { CarouselRepository } from "../coin-collection-repository/CarouselRepository.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";

export class CarouselService extends CarouselRepository {
  constructor() {
    super(CarouselService.#getNav());
  }

  static #getNav() {
    return this.getCarouselNavElement({
      id: "carousel-nav",
      className: "carousel-nav",
      ariaLabel: "State Carousel",
    });
  }
  #init = this.#putCarouselAssemblyinNav();

  #putCarouselAssemblyinNav() {
    const dto = this.#getRandomIndex();
    const entity = CarouselEntity.fromDTO(dto);
    const layout = this.getStateCarouselLayout({
      id: "state-carousel",
      className: "state-carousel",
      hidden: document.documentElement.dataset.mq === "false",
    });
    this.putNavInCarouselLayout(layout);
    this.putCarouselInNav(entity.nodes);
    this.putSlidesInCarousel([
      ...entity.prev,
      ...entity.active,
      ...entity.next,
    ]);
  }
  #putSlidesInPosition(body) {
    const dto = CarouselDTO.fromEntity(body);
    const entity = CarouselEntity.fromDTO(dto);
    const { prev, active, next } = entity;
    Object.entries({ prev, active, next }).forEach(([key, slide]) => {
      const path = entity.navPaths[key];
      const container = this.getSlideContainer({ s, o: key });
      const geo = GeoUtility.getGeometryForSlide(path);
      const svg = this.getSvgForSlidePath({ geo });
      this.putPathInSlideSvg({ svg, p: path });
      this.putSvgInCarouselSlide({ cs: container, svg });
    });
    this.putNewSlidesInCarousel([...prev, ...active, ...next]);
  }

  #getRandomIndex() {
    const { length } = CarouselDTO.fromEntity({});
    const calc = (l) => Math.floor(Math.random() * l);
    return CarouselDTO.fromEntity({
      index: calc(length),
    });
  }

  #putCarouselInPrevState() {
    const { length, index } = CarouselDTO.fromEntity({});
    const calc = (l, i) => (i - 1 + l) % l;
    const dto = CarouselDTO.fromEntity({
      index: calc(length, index),
    });
  }
  #putCarouselInNextState() {
    const { length, index } = CarouselDTO.fromEntity({});
    const calc = (l, i) => (i + 1) % l;
    const dto = CarouselDTO.fromEntity({
      index: calc(length, index),
    });
  }
}
