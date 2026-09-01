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
    });
    this.putNavInCarouselLayout(layout); // Nav is the repository's entity
    this.putCarouselInNav(entity.nodes);
    this.putSlidesInCarousel([
      ...entity.prev,
      ...entity.active,
      ...entity.next,
    ]);
  }
  postPreviousStateSlide() {
    const { length, index } = CarouselDTO.fromEntity({});
    const calc = (l, i) => (i - 1 + l) % l;
    CarouselDTO.fromEntity({ index: calc(length, index) });
    //This is not where the story ends. This updates USMapDTO index relationship.
  }
  postNextStateSlide() {
    const { length, index } = CarouselDTO.fromEntity({});
    const calc = (l, i) => (i + 1) % l;
    CarouselDTO.fromEntity({ index: calc(length, index) });
    //This is not where the story ends. This updates USMapDTO index relationship.
  }

  putSlidesInPosition(body) {
    const dto = CarouselDTO.fromEntity(body);
    const entity = CarouselEntity.fromDTO(dto);
    const { prev, active, next } = entity;
    Object.entries({ prev, active, next }).forEach(([key, slide]) => {
      const path = entity.navPaths[key];
      const container = this.getSlideContainer({ s: [...slide][0], o: key });
      const { geo } = GeoUtility.getGeometryForSlide(path);
      const svg = this.getSvgForSlidePath({
        ...geo,
        id: entity.svgId,
        data: { name: path.dataset.name },
      });
      this.putPathInSlideSvg({ svg, p: path });
      this.putSvgInCarouselSlide({ cs: container, svg });
    });
    this.putSlidesInCarousel([...prev, ...active, ...next]);
  }

  putCarouselOnOffDisplay() {
    super.putCarouselOnOffDisplay();
  }

  #getRandomIndex() {
    const dto = CarouselDTO.fromEntity({});
    const calc = (l) => Math.floor(Math.random() * l);
    return CarouselDTO.fromEntity({
      index: calc(dto.length),
    });
  }
}
