import { DocumentStore } from "../DocumentStore.js";
import { HtmlStore } from "../HtmlStore.js";
import { DocumentClient } from "./DocumentClient.js";

export class CarouselRepository extends DocumentClient {
  constructor(view) {
    super();
    this.#entity = view.entity
  }
  #entity

  getStateCarouselLayout(props) {
    this.#entity.layout = document.body.appendChild(
      DocumentStore.createDivElement(props).node,
    );
  }

  getCarouselPartsWithHtml(html){
    return super.GET(html, (t) => HtmlStore.from(t).nodes)
  }
  getSlidesFromCarousel() {
    return super.GET(
      this.#entity,
      ({ carousel }) => carousel.firstChild.children,
    );
  }
  getSlideContainer(slide) {
    return super.GET(slide, (s) => s.firstChild);
  }
  getSvgForSlidePath(props) {
    return document.body.appendChild(DocumentStore.createSvgElement(props));
  }
  putSlideTogether(assembly){
    super.PUT(assembly, ({svg, p, cs, s}) => {
      svg.append(p);
      cs.replaceChildren(svg, s)
    })
  }
  putCarouselNavTogether(entity) {
    super.PUT(entity, ({ nav, slides }) => {//slides needs to be converted to iterable
      const { layout, carousel } = this.#entity;
      layout.append(carousel);
      carousel.append(...nav);
      carousel.firstChild.replaceChildren(...Object.values(slides));//obj -> array spread
    });
  }
  putCarouselOnOffDisplay() {
    super.PUT(
      window.matchMedia("(max-width: 768px)").matches,
      (m) => (this.#entity.layout.hidden = !m),
    );
  }
}
