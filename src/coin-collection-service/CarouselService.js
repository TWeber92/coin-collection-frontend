import { CarouselDTO } from "../coin-collection-dto/CarouselDTO.js";
import { CarouselEntity } from "../coin-collection-entity/CarouselEntity.js";
import { CarouselRepository } from "../coin-collection-repository/CarouselRepository.js";
import { GeoUtility } from "../coin-collection-utility/GeoUtility.js";

export class CarouselService {
  constructor() {
    this.#repo = new CarouselRepository();
    this.#putCarouselAssemblyinNav();
  }

  #repo;

  #putCarouselAssemblyinNav() {
    const dto = this.#getRandomIndex();
    const entity = CarouselEntity.fromDTO(dto);
    const layout = this.#repo.getStateCarouselLayout({
      id: "state-carousel",
      className: "state-carousel",
    });
    this.#repo.putNavInCarouselLayout(layout); // Nav is the repository's entity
    this.#repo.putCarouselInNav(entity.nodes);
    this.#repo.putSlidesInCarousel([
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

  async putSlidesInPosition(body) {
    const dto = CarouselDTO.fromEntity(body);
    const entity = CarouselEntity.fromDTO(dto);
    const { prev, active, next } = entity;
    for (const [key, slide] of Object.entries({ prev, active, next })) {
      const path = entity.navPaths[key];
      const container = this.#repo.getSlideContainer({
        s: [...slide][0],
        o: key,
      });
      const { geo } = await GeoUtility.getGeometryForSlide(path);
      const svg = this.#repo.getSvgForSlidePath({
        ...geo,
        id: entity.svgId,
        data: { name: path.dataset.name },
      });
      this.#repo.putPathInSlideSvg({ svg, p: path });
      this.#repo.putSvgInCarouselSlide({ cs: container, svg });
    }
    this.#repo.putSlidesInCarousel([...prev, ...active, ...next]);
  }

  putCarouselOnOffDisplay() {
    this.#repo.putCarouselOnOffDisplay();
  }

  #getRandomIndex() {
    const dto = CarouselDTO.fromEntity({});
    const calc = (l) => Math.floor(Math.random() * l);
    return CarouselDTO.fromEntity({
      index: calc(dto.length),
    });
  }
}
