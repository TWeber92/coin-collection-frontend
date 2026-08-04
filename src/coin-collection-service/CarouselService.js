import { CarouselDTO } from "../coin-collection-dto/CarouselDTO";
import { CarouselEntity } from "../coin-collection-entity/CarouselEntity";
import { GeoUtility } from "../coin-collection-utility/GeoUtility";

export class CarouselService extends CarouselRepository {
  constructor() {
    super(this.#getNav());
  }

  #getNav() {
    return this.getCarouselNavElement({
      id: "carousel-nav",
      class: "carousel-nav",
      ariaLabel: "State Carousel",
    });
  }
  #init = this.#putCarouselAssemblyinNav();

  #putCarouselAssemblyinNav() {
    const dto = this.#getRandomIndex();
    const entity = CarouselEntity.fromDTO(dto);
    entity.slides = dto;
    const layout = this.getCarouselLayout({
      id: "state-carousel",
      className: "state-carousel",
      hidden: document.dataset.mq ? true : false,
    });
    this.putNavInCarouselLayout(layout);
    this.putCarouselInNav(entity.nodes);
    this.putSlidesInCarousel(...entity.slides);
  }
  #putSlidesInPosition(body) {
    const dto = CarouselDTO.fromEntity(body);
    const entity = CarouselEntity.fromDTO(dto);
    entity.slides = dto;
    Object.entries(entity.slides).forEach(([key, slide]) => {
      const path = entity.navPaths[key];
      const container = this.getSlideContainer({ s, o: key });
      const geo = GeoUtility.getGeometryForSlide(path);
      const svg = this.getSvgForSlidePath({ geo });
      this.putPathInSlideSvg({ svg, p: path });
      this.putSvgInCarouselSlide({ cs: container, svg });
    });
    this.putNewSlidesInCarousel(...entity.slides);
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
