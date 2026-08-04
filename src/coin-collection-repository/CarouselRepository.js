import { DocumentStore } from "../DocumentStore";
import { DocumentClient } from "./DocumentClient";

export class CarouselRepository extends DocumentClient {
  constructor(entity) {
    super(entity);
  }

  static getCarouselNavElement(value) {
    return DocumentStore.createNavElement(value).appendTo(document.body);
  }
  getStateCarouselNavLayout(value) {
    return DocumentStore.createDivElement(value).appendTo(document.body);
  }
  getSvgForSlidePath(value) {
    return DocumentStore.createSvgElement(value).appendTo(document.body);
  }
  getSlideContainer(value) {
    return super.GET(value, (v) => v.s.querySelector(`[data-option='${v.o}]`));
  }
  putNavInCarouselLayout(value) {
    super.PUT(value, (l) => l.append(this.entity));
  }
  putSlidesInCarousel(value) {
    super.PUT(value, (s) => this.entity.firstElementChild.replaceChildren(s));
  }
  putCarouselInNav(value) {
    super.PUT(value, (c) => this.entity.append(c));
  }
  putPathInSlideSvg(value) {
    super.PUT(value, (v) => v.svg.append(v.p));
  }
  putSvgInCarouselSlide(value) {
    super.PUT(value, (v) => v.cs.prepend(v.svg));
  }
}
