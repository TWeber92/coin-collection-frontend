import { CarouselService } from "./coin-collection-service/CarouselService.js";
import { CoinService } from "./coin-collection-service/CoinService.js";
// import { CollectionService } from "./coin-collection-service/CollectionService.js";
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
  #services = {
    headerService: new HeaderService(),
    usMapService: new USMapService(),
    carouselService: new CarouselService(),
    // collectionService: new CollectionService(),
    coinService: new CoinService(),
    pageService: new PageService(),
    modalService: new ModalService(),
    tooltipService: new TooltipService(),
  };
  #eventRegister = new EventRegister(this.#services);
}
