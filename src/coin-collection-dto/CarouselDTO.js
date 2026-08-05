import { USMapDTO } from "./USMapDTO.js";

export class CarouselDTO {
  #index;
  #paths;
  #template;
  #navPaths;
  #active;
  #next;
  #prev;
  constructor(entity) {
    entity = { ...this.#toJSON(), ...entity };
    this.#template = `
        <div id="carousel class="carousel-track""></div>
        <div class="carousel-controls" id="carousel">
          <button id="prev" data-option="prev" type="button" aria-label="Previous slide">‹</button>
          <div class="carousel-dots" id="carousel" role="tablist">
            <span id="dot" data-option="prev" role="tab" aria-label="Slide 1"></span>
            <span id="dot" data-option="active" role="tab" aria-label="Slide 2"></span>
            <span id="dot" data-option="next" role="tab" aria-label="Slide 3"></span>
          </div>
          <button id="next" data-option="next" type="button" aria-label="Next slide">›</button>
        </div>`;
    this.#active = `
        <div id="slide" class="carousel-slide">
          <div id="state class="slide-card" data-option="active">
            <span class="state-name">${entity.active?.name.toUpperCase()}</span>
          </div>
        </div>`;
    this.#next = `
        <div id="slide" class="carousel-slide">
          <div id="state class="slide-card" data-option="next">
            <span class="state-name">${entity.next?.name.toUpperCase()}</span>
          </div>
        </div>`;
    this.#prev = `
        <div id="slide" class="carousel-slide">
          <div id="state class="slide-card" data-option="prev">
            <span class="state-name">${entity.prev?.name.toUpperCase()}</span>
          </div>
        </div>`;
    this.#index = entity.index;
    this.#paths = entity.paths;
    this.#navPaths = {
      prev: entity.prev?.path,
      active: entity.active?.path,
      next: entity.next?.path,
    };
  }
  #toJSON() {
    return {
      index: this.#index,
      length: this.#paths?.length,
      template: this.#template,
      active: this.#active,
      next: this.#next,
      prev: this.#prev,
      navPaths: this.#navPaths,
    };
  }
  static fromEntity(entity) {
    return new CarouselDTO(entity).#toJSON();
  }
}
