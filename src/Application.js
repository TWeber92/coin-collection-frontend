import { AuthController } from "./coin-collection-controller/AuthController.js";
import { CarouselController } from "./coin-collection-controller/CarouselController.js";
import { CoinController } from "./coin-collection-controller/CoinController.js";
import { CollectionController } from "./coin-collection-controller/CollectionController.js";
import { HeaderController } from "./coin-collection-controller/HeaderController.js";
import { ModalController } from "./coin-collection-controller/ModalController.js";
import { PageController } from "./coin-collection-controller/PageController.js";
import { TooltipController } from "./coin-collection-controller/TooltipController.js";
import { USMapController } from "./coin-collection-controller/USMapController.js";
import { APIClient } from "./coin-collection-repository/APIClient.js";
import { AuthRepository } from "./coin-collection-repository/AuthRepository.js";
import { BrowserRepository } from "./coin-collection-repository/BrowserRepository.js";
import { CarouselRepository } from "./coin-collection-repository/CarouselRepository.js";
import { CoinRepository } from "./coin-collection-repository/CoinRepository.js";
import { CollectionRepository } from "./coin-collection-repository/CollectionRepository.js";
import { HeaderRepository } from "./coin-collection-repository/HeaderRepository.js";
import { ModalRepository } from "./coin-collection-repository/ModalRepository.js";
import { PageRepository } from "./coin-collection-repository/PageRepository.js";
import { TooltipRepository } from "./coin-collection-repository/TooltipRepository.js";
import { USMapRepository } from "./coin-collection-repository/USMapRepository.js";
import { AuthService } from "./coin-collection-service/AuthService.js";
import { CarouselService } from "./coin-collection-service/CarouselService.js";
import { CoinService } from "./coin-collection-service/CoinService.js";
import { CollectionService } from "./coin-collection-service/CollectionService.js";
import { HeaderService } from "./coin-collection-service/HeaderService.js";
import { ModalService } from "./coin-collection-service/ModalService.js";
import { PageService } from "./coin-collection-service/PageService.js";
import { TooltipService } from "./coin-collection-service/TooltipService.js";
import { USMapService } from "./coin-collection-service/USMapService.js";
export class Application {
  static #controllers = {};

  constructor() {
    const views = Application.viewInstance.views;
    const controllers = Application.#controllers;
    controllers.collectionController = this.#buildCollection(
      views.collectionView,
    );
    controllers.headerController = this.#buildHeader(views.headerView);
    controllers.usMapController = this.#buildUSMap(views.usMapView);
    controllers.carouselController = this.#buildCarousel(views.carouselView);
    controllers.coinController = this.#buildCoin(views.coinView);
    controllers.pageController = this.#buildPage(views.pageView);
    controllers.modalController = this.#buildModal(views.modalView);
    controllers.tooltipController = this.#buildTooltip(views.tooltipView);
    controllers.authController = this.#buildAuth();
    if (navigator.webdriver) window.Controllers = controllers;
  }

  #browser = new BrowserRepository();
  #api = new APIClient("https://coin-api.coin-collection.workers.dev");
  #local = new APIClient("https://localhost:3000");
  #asset = new APIClient("./assets");
  #mq = window.matchMedia("(max-width: 768px)").matches;

  static get controllers() {
    return Application.#controllers;
  }

  static viewInstance;

  #buildCollection(view) {
    const repo = new CollectionRepository(view, this.#api, this.#local, mq);
    const service = new CollectionService(repo, this.#browser);
    return new CollectionController(service);
  }

  #buildHeader(view) {
    const repo = new HeaderRepository(view);
    const service = new HeaderService(repo, this.#browser);
    return new HeaderController(service);
  }

  #buildUSMap(view) {
    const repo = new USMapRepository(view, this.#asset, this.#browser);
    const service = new USMapService(repo);
    return new USMapController(service);
  }

  #buildCarousel(view) {
    const repo = new CarouselRepository(view);
    const service = new CarouselService(repo);
    return new CarouselController(service);
  }

  #buildCoin(view) {
    const repo = new CoinRepository(view, this.#api, this.#browser);
    const service = new CoinService(repo);
    return new CoinController(service);
  }

  #buildPage(view) {
    const repo = new PageRepository(view);
    const service = new PageService(repo);
    return new PageController(service);
  }

  #buildModal(view) {
    const repo = new ModalRepository(view);
    const service = new ModalService(repo);
    return new ModalController(service);
  }

  #buildTooltip(view) {
    const repo = new TooltipRepository(view);
    const service = new TooltipService(repo);
    return new TooltipController(service);
  }

  #buildAuth() {
    const repo = new AuthRepository(this.#api, this.#local);
    const service = new AuthService(repo);
    return new AuthController(service);
  }
}
