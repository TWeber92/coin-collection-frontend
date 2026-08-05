// import { event } from "../coin-collection-functions.js";
// import { CarouselController } from "./coin-collection-controller/CarouselController.js";
// import { CoinController } from "./coin-collection-controller/CoinController.js";
// import { CollectionController } from "./coin-collection-controller/CollectionController.js";
import { HeaderController } from "./coin-collection-controller/HeaderController.js";
// import { ModalController } from "./coin-collection-controller/ModalController.js";
// import { PageController } from "./coin-collection-controller/PageController.js";
// import { TooltipController } from "./coin-collection-controller/TooltipController.js";
// import { USMapController } from "./coin-collection-controller/USMapController.js";

export class EventRegister {
  static #transition;
  static #controllers = {};
  #service;
  constructor(services) {
    this.#service = services;
    this.#registerControllers();
    this.#registerListeners();
  }
  static set transition(transition) {
    EventRegister.#transition = transition;
  }
  static get controllers() {
    return EventRegister.#controllers;
  }
  #registerControllers() {
    const controllers = EventRegister.controllers;
    controllers.headerController = new HeaderController(
      this.#service.headerService,
      // );
      // this.controllers.usMapController = new USMapController(
      //   this.#service.usMapService,
      // );
      // this.controllers.collectionController = new CollectionController(
      //   this.#service.collectionService,
      // );
      // this.controllers.carouselController = new CarouselController(
      //   this.#service.carouselService,
      // );
      // this.controllers.coinController = new CoinController(
      //   this.#service.coinService,
      // );
      // this.controllers.pageController = new PageController(
      //   this.#service.modalService,
      // );
      // this.controllers.modalController = new ModalController(
      //   this.#service.modalService,
      // );
      // this.controllers.tooltipController = new TooltipController(
      //   this.#service.tooltipService,
    );
    // this.controllers.scrollController = new ScrollController(
    //   this.#service.scrollService,
    // );
    // this.controllers.sortController = new SortController(
    //   this.#service.sortService,
    // );
  }
  #registerListeners() {
    // this.#registerClickListener();
    // this.#registerInputListener();
    // this.#registerSubmitListener();
    // this.#registerMouseListeners();
    // this.#registerResizeListener();
    // this.#registerTransitionEndListener();
  }

  #registerClickListener() {
    document.addEventListener("click", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  #registerInputListener() {
    document.addEventListener("input", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  #registerSubmitListener() {
    document.addEventListener("submit", async (e) => {
      e.preventDefault();
      await event(e);
    });
  }
  #registerMouseListeners() {
    document.addEventListener("mouseover", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
    document.addEventListener("mouseout", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
  }
  #registerTransitionEndListener() {
    document.addEventListener("transitionend", async (e) => {
      if (EventRegister.#transition) EventRegister.#transition();
    });
  }
  #registerResizeListener() {
    window.addEventListener("resize", async (e) => {
      await event(e);
    });
  }
}
