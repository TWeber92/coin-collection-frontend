import { AuthService } from "./coin-collection-service/AuthService.js";
import { CarouselService } from "./coin-collection-service/CarouselService.js";
import { CoinService } from "./coin-collection-service/CoinService.js";
import { CollectionService } from "./coin-collection-service/CollectionService.js";
import { HeaderService } from "./coin-collection-service/HeaderService.js";
import { ModalService } from "./coin-collection-service/ModalService.js";
import { PageService } from "./coin-collection-service/PageService.js";
import { TooltipService } from "./coin-collection-service/TooltipService.js";
import { USMapService } from "./coin-collection-service/USMapService.js";
import { EventRegister } from "./EventRegister.js";

export class Application {
  constructor() {
    console.log("Services Instantiated! ✅");
  }

  #services = {};

  #init = (async () => {
    const promise = (service, name) =>
      new Promise((resolve) => (this.#services[name] = new service(resolve)));
    this.#services.headerService = new HeaderService();
    await promise(USMapService, "usMapService");
    // console.log(this.#services.usMapService);
    this.#services = {
      ...this.#services,
      carouselService: new CarouselService(),
      collectionService: new CollectionService(),
      coinService: new CoinService(),
      pageService: new PageService(),
      modalService: new ModalService(),
      tooltipService: new TooltipService(),
      authService: new AuthService(),
    };
    // console.log(this.#services);

    new EventRegister(this.#services);
  })();
}
