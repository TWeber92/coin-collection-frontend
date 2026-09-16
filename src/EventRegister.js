import { event } from "../coin-collection-functions/index.js";
import { AuthController } from "./coin-collection-controller/AuthController.js";
import { CarouselController } from "./coin-collection-controller/CarouselController.js";
import { CoinController } from "./coin-collection-controller/CoinController.js";
import { CollectionController } from "./coin-collection-controller/CollectionController.js";
import { HeaderController } from "./coin-collection-controller/HeaderController.js";
import { ModalController } from "./coin-collection-controller/ModalController.js";
import { PageController } from "./coin-collection-controller/PageController.js";
import { TooltipController } from "./coin-collection-controller/TooltipController.js";
import { USMapController } from "./coin-collection-controller/USMapController.js";
import { USMapEntity } from "./coin-collection-entity/USMapEntity.js";

export class EventRegister {
  static #transition;
  static #timer;
  static #controllers = {};
  #service;
  constructor(services) {
    this.#service = services;
    this.#registerControllers();
    this.#registerListeners();
  }
  static set mutation({ node, fn }) {
    const mo = new MutationObserver(() => {
      mo.disconnect();
      fn();
    });
    mo.observe(node, { childList: true, subtree: true });
  }
  static set transition(transition) {
    EventRegister.#transition = transition;
  }
  static set timer(transition) {
    EventRegister.#timer = transition;
  }
  static get controllers() {
    return EventRegister.#controllers;
  }
  #registerControllers() {
    const controllers = EventRegister.controllers;
    controllers.authController = new AuthController(this.#service.authService);
    controllers.headerController = new HeaderController(
      this.#service.headerService,
    );
    controllers.usMapController = new USMapController(
      this.#service.usMapService,
    );
    controllers.carouselController = new CarouselController(
      this.#service.carouselService,
    );
    controllers.collectionController = new CollectionController(
      this.#service.collectionService,
    );
    controllers.coinController = new CoinController(this.#service.coinService);
    controllers.pageController = new PageController(this.#service.pageService);
    controllers.modalController = new ModalController(
      this.#service.modalService,
    );
    controllers.tooltipController = new TooltipController(
      this.#service.tooltipService,
    );
    // this.controllers.scrollController = new ScrollController(
    //   this.#service.scrollService,
    // );
    // this.controllers.sortController = new SortController(
    //   this.#service.sortService,
    // );
  }
  #registerListeners() {
    this.#registerClickListener();
    this.#registerInputListener();
    // this.#registerSubmitListener();
    this.#registerPointerListeners();
    this.#registerTransitionListener();
    // this.#registerMutationListener();
    this.#registerLoadedListener();
    this.#registerResizeListener();
  }

  #registerClickListener() {
    document.addEventListener("click", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
    // document.addEventListener("pointerdown", async (e) => {
    //   if (e.target.nodeType !== 1) return;
    //   await event(e);
    // });
    // document.addEventListener("pointerup", async (e) =>
    //   clearTimeout(EventRegister.#timer)
    // );
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
  #currentRegion;
  async #registerPointerListeners() {
    document.addEventListener("mouseover", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
    document.addEventListener("mouseout", async (e) => {
      if (e.target.nodeType !== 1) return;
      await event(e);
    });
    document.addEventListener("pointermove", async (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const region = el?.closest("path, foreignObject") ?? null;
      if (region === this.#currentRegion) return;
      if (this.#currentRegion)
        await event(
          this.#patchEvent(
            { target: this.#currentRegion, type: e.type },
            this.#currentRegion.tagName,
            this.#currentRegion.id,
          ),
        );
      this.#currentRegion = region;
      if (region)
        await event(
          this.#patchEvent(
            { target: region, type: e.type },
            region.tagName,
            region.id,
          ),
        );
    });
  }
  #registerTransitionListener() {
    document.addEventListener("transitionend", async (e) => {
      if (EventRegister.#transition) await EventRegister.#transition();
      EventRegister.#transition = null;
    });
    document.addEventListener("transitionstart", async (e) => {
      if (EventRegister.#transition) await EventRegister.#transition();
      EventRegister.#transition = null;
    });
  }
  async #registerResizeListener() {
    window
      .matchMedia("(max-width: 768px)")
      .addEventListener(
        "change",
        async (e) => await event(this.#patchEvent(e, "UI", "update")),
      );
  }
  async #registerLoadedListener() {
    window.addEventListener(
      "load",
      async (e) => await event(this.#patchEvent(e, "UI", "update")),
    );
  }
  #patchEvent(e, tagName, id) {
    e.composedPath = () => [{ tagName, id }];
    return e;
  }
}
