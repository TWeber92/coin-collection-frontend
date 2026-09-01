import { USMapDTO } from "./USMapDTO.js";

export class CarouselDTO {
  static #json = {};
  #index; //Carousel Index
  #paths; //All State Paths
  #template; //Main Template Container
  #navPaths; //State Paths for the Nav Carousel Path and Sibling
  #active; //Active Template
  #next; //Next Template
  #prev; //Prev Template
  #svgId;
  constructor(entity) {
    entity = { ...CarouselDTO.#json, ...entity };
    this.#template = `
        <div id="carousel" class="carousel-track"></div>
        <div class="carousel-controls" id="carousel">
          <button id="prev" data-option="prev" type="button" aria-label="Previous slide">‹</button>
          <div class="carousel-dots" id="carousel" role="tablist">
            <span id="prev" class="dot" data-option="prev" role="tab" aria-label="Slide 1"></span>
            <span id="active" class="dot" data-option="active" role="tab" aria-label="Slide 2"></span>
            <span id="next" class="dot" data-option="next" role="tab" aria-label="Slide 3"></span>
          </div>
          <button id="next" data-option="next" type="button" aria-label="Next slide">›</button>
        </div>`;
    this.#active = `
        <div id="slide" class="carousel-slide" data-active>
          <div id="state" class="slide-card" data-name="${entity.active?.name}" data-option="active">
            <span class="state-name">${entity.active?.name?.toUpperCase()}</span>
          </div>
        </div>`;
    this.#next = `
        <div id="slide" class="carousel-slide" data-next>
          <div id="state" class="slide-card" data-name="${entity.next?.name}" data-option="next">
            <span class="state-name">${entity.next?.name?.toUpperCase()}</span>
          </div>
        </div>`;
    this.#prev = `
        <div id="slide" class="carousel-slide" data-prev>
          <div id="state" class="slide-card" data-name="${entity.prev?.name}" data-option="prev">
            <span class="state-name">${entity.prev?.name?.toUpperCase()}</span>
          </div>
        </div>`;
    this.#index = entity.index;
    this.#paths = entity.paths;
    this.#navPaths = {
      prev: entity.prev?.path,
      active: entity.active?.path,
      next: entity.next?.path,
    };
    this.#svgId = entity.svgId;
    CarouselDTO.#json = this.#toJSON();
  }
  #toJSON() {
    return {
      index: this.#index,
      paths: this.#paths,
      length: this.#paths?.length,
      template: this.#template,
      active: this.#active,
      next: this.#next,
      prev: this.#prev,
      navPaths: this.#navPaths,
      svgId: this.#svgId,
    };
  }
  static fromEntity(entity) {
    new USMapDTO(entity);
    return new CarouselDTO(entity).#toJSON();
  }
}
