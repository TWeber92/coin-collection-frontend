import { DocumentStore } from "../DocumentStore.js";

export class CarouselView {
  #carousel;
  #active;
  #next;
  #prev;
  #span;

  constructor(data) {
    this.#html = data;
  }

  // #entity = { carousel: this.#getCarouselNavElement() };

  get entity() {
    return { carousel: this.#getCarouselNavElement() };
  }

  #getCarouselNavElement() {
    return document.body.appendChild(
      DocumentStore.createNavElement({
        id: "carousel-nav",
        className: "carousel-nav",
        ariaLabel: "State Carousel",
      }).node,
    );
  }

  set #html(data) {
    this.#carousel = `
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
          <div id="state" class="slide-card" data-name data-option="active">
            <span class="state-name"></span>
          </div>
        </div>`;
    this.#next = `
        <div id="slide" class="carousel-slide" data-next>
          <div id="state" class="slide-card" data-name data-option="next">
            <span class="state-name"></span>
          </div>
        </div>`;
    this.#prev = `
        <div id="slide" class="carousel-slide" data-prev>
          <div id="state" class="slide-card" data-name data-option="prev">
            <span class="state-name"></span>
          </div>
        </div>`;
    this.#span = `<span class="state-name">${data.name?.toUpperCase()}</span>`;
  }

  #to() {
    return {
      carousel: this.#carousel,
      active: this.#active,
      next: this.#next,
      prev: this.#prev,
      span: this.#span,
    };
  }

  static from(data) {
    return new CarouselView(data).#to();
  }
}
