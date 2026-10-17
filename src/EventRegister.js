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

export class EventRegister {
  static #transitionstart;
  static #transitionend;
  #currentRegion;
  constructor() {
    this.#registerListeners();
  }
  static set mutation({ node, fn }) {
    const mo = new MutationObserver(() => {
      mo.disconnect();
      fn();
    });
    mo.observe(node, { childList: true, subtree: true });
  }
  static set transitionstart(transition) {
    EventRegister.#transitionstart = transition;
  }
  static set transitionend(transition) {
    EventRegister.#transitionend = transition;
  }
  #registerListeners() {
    this.#registerClickListener();
    this.#registerInputListener();
    this.#registerSubmitListener();
    this.#registerPointerListeners();
    this.#registerTransitionListener();
    this.#registerLoadedListener();
    this.#registerResizeListener();
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
      if (EventRegister.#transitionend) await EventRegister.#transitionend();
      EventRegister.transitionend = null;
    });
    document.addEventListener("transitionstart", async (e) => {
      if (EventRegister.#transitionstart)
        await EventRegister.#transitionstart();
      EventRegister.transitionstart = null;
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
