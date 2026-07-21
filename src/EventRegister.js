import { event } from "../coin-collection-functions";

export class EventRegister {
  static #transition;
  static #controllers = {};
  #service;
  constructor(services) {
    this.#service = services;
    this.#registerControllers();
    this.#registerListeners();
  }
  static get transition() {
    return EventRegister.#transition;
  }
  static get controllers() {
    return EventRegister.#controllers;
  }
  #registerControllers() {
    this.controllers.modalController = new ModalController(
      this.#service.modalService,
    );
    this.controllers.coinController = new CoinController(
      this.#service.coinService,
    );
    this.controllers.tooltipController = new TooltipController(
      this.#service.tooltipService,
    );
    this.controllers.usMapController = new USMapController(
      this.#service.usMapService,
    );
    this.controllers.collectionController = new CollectionController(
      this.#service.collectionService,
    );
    this.controllers.menuController = new MenuController(
      this.#service.menuService,
    );
    this.controllers.scrollController = new ScrollController(
      this.#service.scrollService,
    );
    this.controllers.sortController = new SortController(
      this.#service.sortService,
    );
  }
  #registerListeners() {
    this.#registerClickListener();
    this.#registerInputListener();
    this.#registerSubmitListener();
    this.#registerMouseListeners();
    this.#registerResizeListener();
    this.#registerTransitionEndListener();
  }

  #registerClickListener() {
    document.addEventListener("click", (e) => {
      if (e.target.nodeType !== 1) return;
      event(e);
    });
  }
  #registerInputListener() {
    document.addEventListener("input", (e) => {
      if (e.target.nodeType !== 1) return;
      event(e);
    });
  }
  #registerSubmitListener() {
    document.addEventListener("submit", (e) => {
      e.preventDefault();
      event(e);
    });
  }
  #registerMouseListeners() {
    document.addEventListener("mouseover", (e) => {
      if (e.target.nodeType !== 1) return;
      event(e);
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.nodeType !== 1) return;
      event(e);
    });
  }
  #registerTransitionEndListener() {
    document.addEventListener("transitionend", (e) => {
      event(e);
    });
  }
  #registerResizeListener() {
    window.addEventListener("resize", (e) => {
      event(e);
    });
  }
}
