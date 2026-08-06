import { DocumentStore } from "../DocumentStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class CarouselRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getCarouselNavElement(value) {
    return document.body.appendChild(
      DocumentStore.createNavElement(value).node,
    );
  }
  getStateCarouselLayout(value) {
    return document.body.appendChild(
      DocumentStore.createDivElement(value).node,
    );
  }
  getSvgForSlidePath(value) {
    return document.body.appendChild(
      DocumentStore.createSvgElement(value).node,
    );
  }
  getSlideContainer(value) {
    return super.GET(value, (v) => v.s.querySelector(`[data-option='${v.o}]`));
  }
  putNavInCarouselLayout(value) {
    super.PUT(value, (l) => l.append(this.entity));
  }
  putSlidesInCarousel(value) {
    super.PUT(value, (s) =>
      this.entity.firstElementChild.replaceChildren(...s),
    );
  }
  putCarouselInNav(value) {
    super.PUT(value, (c) => this.entity.append(...c));
  }
  putPathInSlideSvg(value) {
    super.PUT(value, (v) => v.svg.append(v.p));
  }
  putSvgInCarouselSlide(value) {
    super.PUT(value, (v) => v.cs.prepend(v.svg));
  }
}
